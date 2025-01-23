import { FormEvent, useEffect, useState } from 'react'
import { NovaButton } from '../components/NovaButton'
import { NovaModal } from '../components/NovaModal'
import { checkCorrectValidation, checkRequiredField, cleanFields } from '../utils/FormUtilis'
import BaseUrl from '../utils/BaseURL'
import { categoriesMD } from '../interfaces/categoriesMD'
import NovaNotification from '../utils/NovaNotification'
import { productsMD } from '../interfaces/productsMD'
import DataTable from 'react-data-table-component'

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

    new BaseUrl().getData("Products/getProducts")
      .then((responds: categoriesMD) => {
        try {
          const stringy = JSON.stringify(responds);
          const result = JSON.parse(stringy)

          setProducts(result);
        } catch (error: any) {
          new NovaNotification(error.message, "colored").errorNotification();
        }
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
            dataTarget='#product-modal'
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
                selector: (row: any) => row.category,
                sortable: true,
              },
            ]}
            data={[
              {
                id: 1,
                name: 'Beetlejuice',
                category: 'Car',
              },
              {
                id: 2,
                name: 'Ghostbusters',
                category: '19aFsa84',
              },
            ]}
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
            id={"productid"}
            autoComplete="off"
            type="hidden"
            name='productid'
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
                id={"category"}
                autoComplete="off"
                onKeyUp={checkCorrectValidation}
                onBlur={checkCorrectValidation}
                name='category'
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
            className='btn col-12'
          />
        </form>

      } />
    </>
  )
}


export default Products