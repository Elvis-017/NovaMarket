import { FormEvent, useEffect, useState } from 'react'
import { NovaButton } from '../components/NovaButton'
import { NovaModal } from '../components/NovaModal'
import { checkCorrectValidation, checkRequiredField, cleanFields, disableSubmitBtn } from '../utils/FormUtilis'
import BaseUrl from '../utils/BaseURL'
import { categoriesMD } from '../interfaces/categoriesMD'
import NovaNotification from '../utils/NovaNotification'
import { productsMD } from '../interfaces/productsMD'
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

  const [loading, setLoading] = useState<boolean>(false);

  const [categories, setCategories] = useState<Array<categoriesMD>>([]);
  const [products, setProducts] = useState<Array<productsMD>>([]);

  useEffect(() => {

    new BaseUrl().getData("Categories/getCategories")
      .then((responds: categoriesMD) => {
        try {
          const stringy = JSON.stringify(responds);
          const result = JSON.parse(stringy)

          setCategories(result);
        } catch (error: any) {
          new NovaNotification(error.message, "colored").errorNotification();
        }
      })

    setLoading(true);
    getProductsCustomRows()
      .then((data: any) => {
        setProducts(data);
      })
      .finally(() => setLoading(false))

  }, []);

  const submittion = (e: FormEvent) => {
    e.preventDefault();

    if (checkRequiredField()) return;

    setLoading(true);
    disableSubmitBtn("btn-save-product", true);
    saveProducts(() => {
      getProductsCustomRows()
        .then((data: any) => {
          setProducts(data);
        })
        .then(() => {
          hideModal("product-modal");
        })
      })
      disableSubmitBtn("btn-save-product", false);
      setLoading(false)

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

          {loading
            ?
            <LoadingSpinner />
            :

            <DataTable
              pagination
              columns={[
                {
                  name: 'Name',
                  selector: (row: any) => row.name,
                  sortable: true,
                },
                {
                  name: 'Category',
                  selector: (row: any) => row.categoryName,
                  sortable: true,
                },

                {
                  name: 'Action',
                  selector: (row: any) => row.action,
                  sortable: false,
                },
              ]}
              data={products}
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
            onSubmit={(e: FormEvent) => { deleteProduct(e) }}
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