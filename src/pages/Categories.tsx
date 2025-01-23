import { FormEvent, useEffect, useState } from 'react'
import { NovaButton } from '../components/NovaButton'
import { NovaModal } from '../components/NovaModal'
import { checkCorrectValidation, checkRequiredField, cleanFields } from '../utils/FormUtilis'
import { categoriesMD } from '../interfaces/categoriesMD'
import NovaNotification from '../utils/NovaNotification'
import DataTable from 'react-data-table-component'
import {  getProductsCustomRows } from '../utils/ProducsUtils'
import { changeFamiliarTitle } from '../utils/ModalUtils'
import { getCategoriesCustomRows } from '../utils/CategoriesUtils'

export const Categories = () => {

  const MODAL = window.document.getElementById("category-modal");

  MODAL?.addEventListener("hide.bs.modal", (_) => cleanFields());

  const submittion = (e: FormEvent) => {
    e.preventDefault();
    if (checkRequiredField()) return;

  }

  const [categories, setCategories] = useState<Array<categoriesMD>>([]);

  useEffect(() => {

      getCategoriesCustomRows()
      .then((data: any) => {
        setCategories(data);
        
        console.log(data)
      })

  }, []);

  return (
     <>
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        Categories

        <NovaButton
          type='button'
          buttonText='Add'
          onClick={() =>     changeFamiliarTitle("Add Category", "category-modal")}
          dataTarget='#category-modal'
          className='bg-dark'
        />
      </div>
      <div className="card-body">
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
      </div>
    </div>

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
