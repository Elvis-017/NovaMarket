import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Products  from '../pages/Products'
import { Categories } from '../pages/Categories'

export const NovaRoutes = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='index.html' element={<Products/>}/>
        <Route path='' element={<Products/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/categories' element={<Categories/>}/>
      </Routes>
    </BrowserRouter>


  )
}
