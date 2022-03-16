import { Outlet, Link, useLocation } from "react-router-dom"

const Layout = () => {

  const location = useLocation()
  const urlActual = location.pathname;

  return (
    <div className="md:flex md:min-h-screen background-light">

      <div className="md:w-1/4 background px-5 py-10">
        <h2 className="text-4xl text-center text-white font-black">CRM Clientes</h2>
        <nav className="mt-10">

          <Link
            className={`${urlActual === '/clientes' ? 'text-yellow-400' : 'text-white'} text-2xl block mt-2 hover:text-yellow-400 font-bold`} 
            to="/clientes"
          >
            Clientes
          </Link>
          <hr className="mt-3"/>
          <Link
            className={`${urlActual === '/clientes/nuevo' ? 'text-yellow-400' : 'text-white'} text-2xl block mt-2 hover:text-yellow-400 font-bold`} 
            to="/clientes/nuevo"
            >
            Nuevos Clientes
          </Link>

        </nav>
      </div>

      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll overflow-x-hidden">
      <Outlet />
      </div>

    </div>
  )
}

export default Layout