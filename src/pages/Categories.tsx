import { FormEvent, useEffect, useState } from 'react'
import { NovaButton } from '../components/NovaButton'
import { NovaModal } from '../components/NovaModal'
import { checkCorrectValidation, checkRequiredField, cleanFields, disableSubmitBtn } from '../utils/FormUtilis'
import { categoriesMD } from '../interfaces/categoriesMD'
import DataTable from 'react-data-table-component'
import { changeFamiliarTitle, hideModal } from '../utils/ModalUtils'
import { deleteCategory, getCategoriesCustomRows, saveCategories } from '../utils/CategoriesUtils'
import { ConfirmNovaModal } from '../components/ConfirmNovaModal'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const Categories = () => {

  const MODAL = window.document.getElementById("category-modal");
  const MODAL_REMOVE = window.document.getElementById("modal-remove-category");

  MODAL?.addEventListener("hide.bs.modal", (_) => cleanFields());
  MODAL_REMOVE?.addEventListener("hide.bs.modal", (_) => cleanFields());

  const [loading, setLoading] = useState<boolean>(false);


  const [categories, setCategories] = useState<Array<categoriesMD>>([]);

  useEffect(() => {

    getCategoriesCustomRows()
      .then((data: any) => {
        setCategories(data);

      })

  }, []);


  const submittion = (e: FormEvent) => {
    e.preventDefault();
    if (checkRequiredField()) return;

    setLoading(true);
    disableSubmitBtn("btn-save-category", true);

    saveCategories(() => {
      getCategoriesCustomRows()
        .then((data: any) => {
          setCategories(data);
        })
        .then(() => {
          hideModal("category-modal");
        })
    });
    disableSubmitBtn("btn-save-category", false);
    setLoading(false)
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
            dataTarget='#category-modal'
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
                  name: 'Action',
                  selector: (row: any) => row.action,
                  sortable: false,
                },
              ]}
              data={categories}
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
            onSubmit={(e: FormEvent) => {
              deleteCategory(e, () => {


              })
            }}
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
            className='form-control'
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
