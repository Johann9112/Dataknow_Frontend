// src/Facturas.js
import React, { useState , useEffect} from 'react';
import { useForm } from 'react-hook-form';
import CampoTexto from '../CampoTexto'; // Asegúrate de que este archivo esté en la ruta correcta
import MenuDesplegable from '../MenuDesplegable'; // Asegúrate de que este archivo esté en la ruta correcta
import Boton from '../Boton'; // Asegúrate de que este archivo esté en la ruta correcta
import {obtenerClientes, crearFactura} from '../../services/conectionCrud'

const FormularioFacturas = () => {
  const { register, handleSubmit, watch, setValue , reset} = useForm();
  const [valorTotal, setValorTotal] = useState(0);
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState(''); 
  const [tipoMensaje, setTipoMensaje] = useState(''); 
 

  const fetchClientes = async () => {
    try {
        const data = await obtenerClientes();
        console.log("data",data)
        setClientes(data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);
  // Configuración del IVA
  const IVA = 0.19; // 19%

  // Función para calcular el valor total
  const calcularValorTotal = (precio, descuento) => {
    if (isNaN(descuento)) {
        descuento=0;
    } 
    
    if (isNaN(precio)) {
        precio=0;
    } 
    
    const precioConDescuento = precio - descuento;
    const iva = precioConDescuento * IVA;
    return precioConDescuento + iva;
  };

  // Watch para observar los cambios en los campos del formulario
  const precio = watch('precio', 0);
  const valorDescuento = watch('valorDescuento', 0);

  // Efecto para actualizar el valor total cuando cambian los campos
  React.useEffect(() => {
    setValorTotal(calcularValorTotal(parseFloat(precio), parseFloat(valorDescuento)));
  }, [precio, valorDescuento]);

  // Manejo del envío del formulario
  const onSubmit = async (data) => {
    const valorTotalCalculado = calcularValorTotal(parseFloat(data.precio), parseFloat(data.valorDescuento));

    const factura={
        idCliente:data.cliente,
        fecha:data.fecha,
        nombreProducto:data.nombreProducto,
        precio:data.precio,
        valorDescuento:data.valorDescuento,
        valorTotal: valorTotalCalculado 
    }
   
    try {
        const resultado = await crearFactura(factura);
        setMensaje('Factura creado exitosamente!');
        setTipoMensaje('success');
        console.log('Factura creado:', resultado);
        reset();
      } catch (error) {
        console.error('Error al crear Factura:', error);
      }
  };

  return (
    <div>
      <p>Rellena la siguiente información</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MenuDesplegable
          label="Cliente"
          opciones={clientes.map(cliente => ({ value: cliente.IdCliente, label: cliente.Nombre }))}
          {...register('cliente')}
        />
        <CampoTexto
          label="Fecha"
          type="date"
          {...register('fecha', { required: 'La fecha es obligatoria' })}
        />
        <CampoTexto
          label="Nombre del producto"
          {...register('nombreProducto', { required: 'El nombre del producto es obligatorio' })}
        />
        <CampoTexto
          label="Precio"
          type="number"
          step="0.01"
          {...register('precio', { required: 'El precio es obligatorio' })}
        />
        <CampoTexto
          label="Valor de descuento en %"
          type="number"
          step="0.01"
          {...register('valorDescuento')}
        />
        <div>
          <label>IVA (19%)</label>
        </div>
        <div>
          <label>Valor total de la factura</label>
          <p>{valorTotal.toFixed(2)}</p>
        </div>
        <Boton texto="Enviar factura" />
      </form>
      {mensaje && (
  <div className={`mensaje ${tipoMensaje}`}>
    {mensaje}
  </div>
  )}
    </div>
    
  );
};

export default FormularioFacturas;
