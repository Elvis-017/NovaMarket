import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { NovaButton } from '../components/NovaButton'
import { NovaModal } from '../components/NovaModal'
import { checkCorrectValidation, checkRequiredField, cleanFields, disableSubmitBtn } from '../utils/FormUtilis'
import BaseUrl from '../utils/BaseURL'
import { categoriesMD } from '../interfaces/categoriesMD'
import NovaNotification from '../utils/NovaNotification'
import DataTable from 'react-data-table-component'
import { deleteProduct, getProductsCustomRows, saveProducts } from '../utils/ProducsUtils'
import { changeFamiliarTitle, hideModal } from '../utils/ModalUtils'
import { ConfirmNovaModal } from '../components/ConfirmNovaModal'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { IoMdAdd } from "react-icons/io";

const Products = () => {

  const MODAL = window.document.getElementById("product-modal");
  const MODAL_REMOVE = window.document.getElementById("modal-remove");

  MODAL?.addEventListener("hide.bs.modal", (_) => cleanFields());
  MODAL_REMOVE?.addEventListener("hide.bs.modal", (_) => cleanFields());

  const [categories, setCategories] = useState<Array<categoriesMD>>([]);

  const [state, setState] = useState({
    loading: false,
    products: [] as Array<any>,

  });

  const fetchCategories = async () => {
    new BaseUrl().getData("Categories/getCategories")
      .then((responds: categoriesMD) => {
        const stringy = JSON.stringify(responds);
        const result = JSON.parse(stringy)

        setCategories(result);

      })
      .catch((error: any) => {
        new NovaNotification(error, "colored").errorNotification();
      })
  }

  useEffect(() => {

    fetchCategories();

    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    getProductsCustomRows()
      .then((data: any) => {
        setState((prevState) => ({
          ...prevState,
          products: data,
        }));
      })
      .finally(() =>
      {
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      })

  }, []);

  const submittion = async (e: FormEvent) => {
    e.preventDefault();

    if (checkRequiredField()) return;

    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

      disableSubmitBtn("btn-save-product", true);

      await saveProducts(e)
      .then(async()=>{
        const updatedProducts = await getProductsCustomRows();

        setState({
          loading: false,
          products: updatedProducts,
        });
  
        hideModal("product-modal");
      })

    disableSubmitBtn("btn-save-product", false);

  }

  const deletion = async (e: FormEvent) => {
    e.preventDefault();

    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

      await deleteProduct(e)
      .then(async () => {
        const updatedProducts = await getProductsCustomRows();

        setState({
          loading: false,
          products: updatedProducts,
        });

        hideModal("modal-remove");
      })



  }

  return (
    <>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          Products

          <NovaButton
            type='button'
            icon={<IoMdAdd />}
            buttonText='Add'
            onClick={() => changeFamiliarTitle("Add Products", "product-modal")}
            dataTarget='#product-modal'
            className='bg-dark'
          />
        </div>
        <div className="card-body">

          {state.loading
            ?
            <LoadingSpinner />
            :

            <DataTable
              pagination
              columns={[
                {
                  name: "#",
                  selector: (_, index?: number) => (index !== undefined ? index + 1 : 0),
                  sortable: false,
                  width: "5%",
                }
                ,
                {
                  name: 'Name',
                  selector: (row: any) => row.name,
                  sortable: true,
                  width: "40%",
                },
                {
                  name: 'Category',
                  selector: (row: any) => row.categoryName,
                  sortable: true,
                  width: "40%",
                },

                {
                  name: 'Action',
                  selector: (row: any) => row.action,
                  sortable: false,
                },
              ]}
              data={state.products}
            />

          }

        </div>
      </div>
      <ConfirmNovaModal
        id='modal-remove'
        title='Remove Product'
        message='Are You sure you want to delete this product?'
        form='form-remove'
        jsx={
          <form
            action=""
            method='post'
            id="form-remove"
            onSubmit={deletion}
          >

            <input
              id={"idremove"}
              autoComplete="off"
              type="hidden"
              className='form-control-id'
              name='idremove'
            />



          </form>
        } />

      <NovaModal
        id='product-modal'
        title='Add Products'
        modalBody={
          <form
            action=""
            method='post'
            id="form-product"
            onSubmit={submittion}
          >

            <input
              id={"id"}
              autoComplete="off"
              type="hidden"
              className='form-control-id'
              name='id'
            />

            <div className="mb-2">
              <label
                htmlFor="name"
                className="form-label"
              >
                Name
              </label>
              <div className="input-group">

                <input
                  id={"name"}
                  autoComplete="off"
                  onKeyUp={checkCorrectValidation}
                  onBlur={checkCorrectValidation}
                  type="text"
                  className={`form-control`}
                  name='name'
                />
                <strong className="input-valid-label invalid-feedback ">
                  Requerido
                </strong>
              </div>
            </div>

            <div className="mb-2">
              <label
                htmlFor="categoryid"
                className="form-label"
              >
                Category
              </label>
              <div className="input-group">

                <select
                  id={"categoryid"}
                  autoComplete="off"
                  onKeyUp={checkCorrectValidation}
                  onBlur={checkCorrectValidation}
                  name='categoryid'
                  className={` form-control`}
                >
                  <option value="">Seleccione</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}

                </select>
                <strong className="input-valid-label invalid-feedback ">
                  Requerido
                </strong>
              </div>
            </div>

            <NovaButton
              id="btn-save-product"
              form="form-product"

              type='submit'
              buttonText='Guardar'
              className='btn bg-dark col-12'
            />
          </form>

        } />
    </>
  )
}

export default Products