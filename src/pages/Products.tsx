import { FormEvent, useEffect, useState } from 'react'
import { NovaButton } from '../components/NovaButton'
import { NovaModal } from '../components/NovaModal'
import { checkCorrectValidation, checkRequiredField, cleanFields } from '../utils/FormUtilis'
import BaseUrl from '../utils/BaseURL'
import { categoriesMD } from '../interfaces/categoriesMD'
import NovaNotification from '../utils/NovaNotification'
import { productsMD } from '../interfaces/productsMD'
import DataTable from 'react-data-table-component'
import {  getProductsCustomRows } from '../utils/ProducsUtils'
import { changeFamiliarTitle } from '../utils/ModalUtils'

const Products = () => {

  const MODAL = window.document.getElementById("product-modal");

  MODAL?.addEventListener("hide.bs.modal", (_) => cleanFields());

  const submittion = (e: FormEvent) => {
    e.preventDefault();
    if (checkRequiredField()) return;

  }

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

      getProductsCustomRows()
      .then((data: any) => {
        setProducts(data);
        

        console.log(data)
      })

  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          Products

          <NovaButton
            type='button'
            buttonText='Add'
            onClick={() =>     changeFamiliarTitle("Add Products", "product-modal")}
            dataTarget='#product-modal'
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
        </div>
      </div>

      <NovaModal id='product-modal' title='Add Products' modalBody={
        <form
          action=""
          id="form-products"
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

          <div className="mb-2">
            <label
              htmlFor="validationPass"
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
            id="btn-save-products"
            form="form-products"

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