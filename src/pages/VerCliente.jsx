import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'

const VerCliente = () => {

    const navigate = useNavigate()
    const {id} = useParams()

    const [cliente, setCliente] = useState({})
    const [loader, setLoader] = useState(false)

    const { nombre, empresa, email, telefono, notas,} = cliente

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

            loader ? <Loader /> : (
                Object.keys(cliente).length === 0 ? <NotFound /> : (
                    <div className='mt-10 px-5 py-10 bg-white rounded-md shadow-md md:w-3/4 mx-auto'>
                        <h2 className='font-black text-center text-4xl text-blue-400 mb-3'>Información del cliente</h2> 
                        <p className='text-2xl'>
                            <span className='font-bold'>Cliente: </span> {nombre}
                        </p>
                        { empresa &&
                            <p className='text-2xl'>
                                <span className='font-bold'>Empresa: </span> {empresa}
                            </p>
                        }
                        <p className='text-2xl'>
                            <span className='font-bold'>Correo: </span> {email}
                        </p>
                        { telefono && 
                            <p className='text-2xl'>
                                <span className='font-bold'>Teléfono: </span> {telefono}
                            </p>
                        }
                        { notas && 
                            <p className='text-2xl'>
                                <span className='font-bold'>Notas: </span> {notas}
                            </p>
                        }
                        <button
                            type="button"
                            className="background block w-full text-center text-white rounded-md font-bold hover:text-yellow-400 p-1 mt-2"
                            onClick={ () => navigate(`/clientes`) }>
                            Regresar
                        </button>
                    </div>
                    )
                )
    )
}

export default VerCliente