import {useNavigate} from 'react-router-dom'

const Clientes = ({cliente, handleEliminar}) => {

    const navigate = useNavigate();

    const { nombre, empresa, email, telefono, notas, id } = cliente

    return (
        <tr className="border-b hover:bg-gray-100">
            <td className="p-2 text-center">{nombre}</td>
            <td className="p-2 text-center">
                <p><span className="font-bold">Correo: </span>{email}</p>
                <p><span className="font-bold">Telefono: </span>{telefono}</p>
            </td>
            <td className="p-2 text-center">{empresa}</td>
            <td className='p-5'>
                <button
                    type="button"
                    className="bg-blue-500 block w-full text-center text-white rounded-md font-bold hover:text-yellow-400 p-1 mt-2"
                    onClick={ () => navigate(`/clientes/${id}`) }>
                    Ver
                </button>
                <button
                    type="button"
                    className="bg-cyan-400 block w-full text-center text-white rounded-md font-bold hover:text-yellow-400 p-1 mt-2"
                    onClick={ () => navigate(`/clientes/editar/${id}`) }>
                    Editar
                </button>
                <button
                    type="button"
                    className="bg-red-700 block w-full text-center text-white rounded-md font-bold hover:text-yellow-400 p-1 mt-2"
                    onClick={ () => handleEliminar(id) }>
                    Eliminar
                </button>
                <button>

                </button>
            </td>
        </tr>
    )
}

export default Clientes