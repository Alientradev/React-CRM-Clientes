import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cliente from '../components/Cliente'

const Inicio = () => {

  const navigate = useNavigate()
  const [clientes, setClientes] = useState([])

  useEffect( () => {
    const obtenerCliente = async ()=> {
      try {
        const url = import.meta.env.VITE_API_URL
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setClientes(resultado);
      } catch (error) {
        console.log(error)
      }
    }

    obtenerCliente()
  },[])

  const handleEliminar = async (id) => {
    const confirmar = confirm('Desea eliminar este cliente?')
    if(confirmar){
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`

        const respuesta = await fetch(url, {
          method: 'DELETE'
        })
        await respuesta.json()
        
        const arrayClientes = clientes.filter( cliente => cliente.id !== id)
        setClientes(arrayClientes)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <h2 className='font-black text-center text-4xl text-blue-400'>Lista de Clientes</h2> 
      <p className='mt-3 text-center'>Administra tus clientes</p>


        <table className='w-full mt-3 table-auto shadow bg-white'>
        <thead className='background text-white font-bold'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map( cliente => (
              <Cliente 
                key={cliente.id}
                cliente={cliente}
                handleEliminar={handleEliminar}
              />
            ))
          }
        </tbody>
      </table>
        
      {clientes.length > 0 ? "" : <div>
        <h2 className='text-blue-400 text-center text-2xl font-bold mt-10'>No hay clientes registrados, registra un nuevo cliente</h2>
        <button
              type="button"
              className="background block w-1/2 m-auto text-center text-white rounded-md font-bold hover:text-yellow-400 p-1 mt-2"
              onClick={ () => navigate(`/clientes/nuevo`) }>
              Agregar un cliente
        </button>
      </div>}

    </div>
  )
}

export default Inicio