import '../styles/notfound.css'
import ImagenError from '../img/notFound.svg'
import {useNavigate} from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate()

    return (
            <div className='min-h-screen'>
                <img
                    className='m-auto w-1/2'
                    src={ImagenError}
                    alt= 'Error 404'
                />
                <h2 className='font-black text-center text-4xl text-blue-400 mb-3 mt-5'>
                    Error 404 - Pagina No Encontrada!
                </h2>
                <button
                    type="button"
                    className="background block w-1/2 m-auto text-center text-white rounded-md font-bold hover:text-yellow-400 p-1 mt-5"
                    onClick={ () => navigate('/clientes') }>
                    Regresar al inicio
                </button>
            </div>
    )
}

export default NotFound