import { NovaRoutes } from "./utils/NovaRoutes"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>

      <nav className="navbar bg-dark border-bottom border-body navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">NovaMarket</a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/products">Products</a>
              </li>

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/categories">Categories</a>
              </li>

            </ul>
            <div>
            {/*  */}
            </div>
          </div>
        </div>
      </nav>

      <div className="mt-5 container-md  rounded-1">
        <NovaRoutes />


      </div>

      <ToastContainer />
    </>
  )
}

export default App
