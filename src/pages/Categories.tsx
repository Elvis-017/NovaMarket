import { FormEvent, useEffect, useState } from 'react'
import { NovaButton } from '../components/NovaButton'
import { NovaModal } from '../components/NovaModal'
import { checkCorrectValidation, checkRequiredField, cleanFields, disableSubmitBtn } from '../utils/FormUtilis'
// import { categoriesMD } from '../interfaces/categoriesMD'
import DataTable from 'react-data-table-component'
import { changeFamiliarTitle, hideModal } from '../utils/ModalUtils'
import { deleteCategory, getCategoriesCustomRows, saveCategories } from '../utils/CategoriesUtils'
import { ConfirmNovaModal } from '../components/ConfirmNovaModal'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { IoMdAdd } from 'react-icons/io'

export const Categories = () => {

  const MODAL = window.document.getElementById("category-modal");
  const MODAL_REMOVE = window.document.getElementById("modal-remove-category");

  MODAL?.addEventListener("hide.bs.modal", (_) => cleanFields());
  MODAL_REMOVE?.addEventListener("hide.bs.modal", (_) => cleanFields());

  const [state, setState] = useState({
    loading: false,
    categories: [] as Array<any>,

  });


  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    getCategoriesCustomRows()
      .then((data: any) => {
        setState((prevState) => ({
          ...prevState,
          categories: data,
        }))
      
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

    disableSubmitBtn("btn-save-category", true);

      await saveCategories(e)
      .then(async()=>{
        const updatedProducts = await getCategoriesCustomRows();

        setState({
          loading: false,
          categories: updatedProducts,
        });
  
        hideModal("category-modal");
      })

      disableSubmitBtn("btn-save-category", false);

  }

  
    const deletion = async (e: FormEvent) => {
      e.preventDefault();
  
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));
  
        await deleteCategory(e)
        .then(async () => {
          const updatedProducts = await getCategoriesCustomRows();
  
          setState({
            loading: false,
            categories: updatedProducts,
          });

          hideModal("modal-remove-category");
        })
      }
  
  
  return (
    <>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          Categories

          <NovaButton
            type='button'
            buttonText='Add'
            onClick={() => changeFamiliarTitle("Add Category", "category-modal")}
            icon={<IoMdAdd />}
            dataTarget='#category-modal'
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
                },
                {
                  name: 'Name',
                  selector: (row: any) => row.name,
                  sortable: true,
                  width: "80%",
                },
                {
                  name: 'Action',
                  selector: (row: any) => row.action,
                  sortable: false,
                },
              ]}
              data={state.categories}
            />
          }
        </div>
      </div>

      <ConfirmNovaModal
        id='modal-remove-category'
        title='Remove Category'
        message='Are You sure you want to delete this category?'
        form='form-remove-category'
        jsx={
          <form
            action=""
            method='post'
            id="form-remove-category"
            onSubmit={deletion}
          >

            <input
              id={"idremovecategory"}
              autoComplete="off"
              type="hidden"
              className='form-control-id'
              name='idremovecategory'
            />

          </form>
        } />

      <NovaModal id='category-modal' title='Add Category' modalBody={
        <form
          action=""
          id="form-category"
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

          <NovaButton
            id="btn-save-category"
            form="form-category"

            type='submit'
            buttonText='Guardar'
            className='btn bg-dark col-12'
          />
        </form>

      } />
    </>
  )
}
