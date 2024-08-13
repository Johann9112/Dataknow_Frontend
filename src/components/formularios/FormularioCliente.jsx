// src/components/FormularioCliente.js
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CampoTexto from '../CampoTexto';
import MenuDesplegable from '../MenuDesplegable';
import Boton from '../Boton';
import { crearCliente } from '../../services/conectionCrud'; 

const FormularioCliente = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [tiposIdentificacion, setTiposIdentificacion] = useState([]); 
  const [mensaje, setMensaje] = useState(''); 
  const [tipoMensaje, setTipoMensaje] = useState(''); 

  useEffect(() => {  
    setTiposIdentificacion([
      { value: ' ', label: 'Seleccione identificacion' },
      { value: 'CC', label: 'Cédula de Ciudadanía' },
      { value: 'TI', label: 'Tarjeta de Identidad' },
      { value: 'NIT', label: 'NIT' },
      { value: 'PA', label: 'Pasaporte' },
      { value: 'OT', label: 'Otro' }
    ]);
  }, []);

  const onSubmit = async (data) => {
    try {
      const resultado = await crearCliente(data);
      setMensaje('Cliente creado exitosamente!');
      setTipoMensaje('success');
      console.log('Cliente creado:', resultado);
      reset();
    } catch (error) {
      console.error('Error al crear cliente:', error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <CampoTexto  label="Nombre del cliente" {...register('nombre', { required: 'El nombre es obligatorio' })} />
      {errors.nombre && <p>{errors.nombre.message}</p>}
      <MenuDesplegable
        label="Tipo de Identificación"
        opciones={tiposIdentificacion}
        {...register('tipoIdentificacion')}
      />
      <CampoTexto  label="Número de Identificación" {...register('numeroIdentificacion')} />
      <CampoTexto 
      label="Observaciones"
      type="textarea"
      {...register('observaciones')}/>
      <Boton className='buttonCliente' texto="Guardar cliente" />
    </form>

  {mensaje && (
  <div className={`mensaje ${tipoMensaje}`}>
    {mensaje}
  </div>
  )}

</div>
  );
};
export default FormularioCliente;
