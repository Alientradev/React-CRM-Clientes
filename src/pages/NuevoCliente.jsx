import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
    <>
      <h2 className='font-black text-center text-4xl text-blue-400'>Nuevo Cliente</h2> 
      <p className='mt-3 text-center'>Llena los siguientes campos para registrar un nuevo cliente</p>

      <Formulario />
    </>
  )
}

export default NuevoCliente