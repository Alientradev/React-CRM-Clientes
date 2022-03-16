import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Loader from './Loader'

const Formulario = ({cliente, loader}) => {
    
    console.log(cliente.nombre)

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(50, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string(),
        email: Yup.string()
                    .email('Ingresar un correo valido')
                    .required('El correo es obligatorio'),
        telefono: Yup.number() 
                        .positive('Número no valido')
                        .integer('Número no valido')
                        .typeError('Ingrese un número no valido'),
        notas: ''
    })

    const navigate = useNavigate()

    const handleSubmit= async (values) => {
        try{
            let respuesta
            if(cliente.id){
                // Editando un registro 
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                // const resultado = await respuesta.json()
                // navigate('/clientes')
            }else{
                // Nuevo resgistro 
                const url = `${import.meta.env.VITE_API_URL}`
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                // const resultado = await respuesta.json()
                // navigate('/clientes')
            }
                await respuesta.json()
                navigate('/clientes')
        }catch(error){
            console.log(error)
        }
    }

    return (
        loader ? <Loader /> : (
        <div className='mt-10 px-5 py-10 bg-white rounded-md shadow-md md:w-3/4 mx-auto'>
            <h2 className='text-center font-bold'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar cliente nuevo'}</h2>
            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? ""
                }}
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)
                    resetForm()
                } }
                validationSchema={nuevoClienteSchema}
                >

                {(
                    <Form
                        className='mt-5'>
                        <div className='mb-3'>
                            <label
                                htmlFor='nombre'>
                            Nombre: 
                            </label>
                            <Field
                                id='nombre'
                                type='text'
                                className='w-full mt-2 block p-1 bg-gray-300 rounded-md'
                                placeholder='Ingresa el nombre del cliente'
                                name='nombre' 
                            />
                            <ErrorMessage 
                                name='nombre'
                                component='div'
                                className='bg-red-600 mt-2 rounded-md text-center text-white'
                            />
                            {/* Otra forma de hacerlo usando un div: */}
                            {/* { errors.nombre && touched.nombre ? (
                                <div
                                    className='bg-red-600 text-white'>
                                    {errors.nombre}
                                </div> ) : null
                                } */}
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor='empresa'>
                            Empresa: 
                            </label>
                            <Field
                                id='empresa'
                                type='text'
                                className='w-full mt-2 block p-1 bg-gray-300 rounded-md'
                                placeholder='Ingresa la empresa del cliente' 
                                name='empresa'
                            />
                            <ErrorMessage 
                                name='empresa'
                                component='div'
                                className='bg-red-600 mt-2 rounded-md text-center text-white'
                            />
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor='email'>
                            E-Mail : 
                            </label>
                            <Field
                                id='email'
                                type='email'
                                className='w-full mt-2 block p-1 bg-gray-300 rounded-md'
                                placeholder='Ingresa el e-mail del cliente' 
                                name='email'
                            />
                            <ErrorMessage 
                                name='email'
                                component='div'
                                className='bg-red-600 mt-2 rounded-md text-center text-white'
                            />
                        </div> 
                        <div className='mb-3'>
                            <label
                                htmlFor='telefono'>
                            Teléfono: 
                            </label>
                            <Field
                                id='telefono'
                                type='tel'
                                className='w-full mt-2 block p-1 bg-gray-300 rounded-md'
                                placeholder='Ingresa el teléfono del cliente' 
                                name='telefono'
                            />
                            <ErrorMessage 
                                name='telefono'
                                component='div'
                                className='bg-red-600 mt-2 rounded-md text-center text-white'
                            />
                        </div> 
                        <div className='mb-3'>
                            <label
                                htmlFor='notas'>
                            Notas: 
                            </label>
                            <Field
                                as='textarea'
                                id='notas'
                                type='text'
                                className='w-full mt-2 block p-1 bg-gray-300 rounded-md resize-none h-40'
                                placeholder='Ingresa las notas o comentarios adicionales' 
                                name='notas'
                            />
                        </div> 
                        <input 
                            type='submit'
                            value={cliente?.nombre ? 'Editar Cliente' : 'Agregar cliente nuevo'}
                            className='background w-full rounded-md text-white font-bold text-lg p-1 cursor-pointer'
                        />
                    </Form>

                )}
            </Formik>
        </div>)
    )
}

Formulario.defaultProps = {
    cliente: {},
    loader: false
}

export default Formulario