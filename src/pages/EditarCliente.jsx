import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Formulario from "../components/Formulario"
import NotFound from '../components/NotFound'

const EditarCliente = () => {

  const {id} = useParams()
  const [cliente, setCliente] = useState({})
  const [loader, setLoader] = useState(false)
  
  useEffect( () =>{
    setLoader(!loader)
    const obtenerClienteAPI = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/${id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            setCliente(resultado)
        } catch (error) {
            console.log(error)
        }
        setLoader(false)
    }
    obtenerClienteAPI()
}, [])
  
  return (
    <>
      <h2 className='font-black text-center text-4xl text-blue-400'>Editar Cliente</h2> 
      <p className='mt-3 text-center'>Edita los datos del cliente</p>
      {cliente?.nombre ? (
          <Formulario 
            cliente={cliente}
            loader={loader}
          /> 
      ) :  <h2 className='font-black text-center text-4xl text-blue-400 mt-10'>No se encuentra el cliente - ID no válido</h2>  } 
    </>
  )
}

export default EditarCliente