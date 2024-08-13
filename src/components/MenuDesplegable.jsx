import React, { forwardRef } from 'react';

const MenuDesplegable = forwardRef(({ label, opciones = [], ...rest }, ref) => {
  if (!Array.isArray(opciones)) {
    console.error('Las opciones deben ser un arreglo');
    return null;
  }

  return (
    <div className="menu-desplegable">
      <label>{label}</label>
      <select {...rest} ref={ref}>
        {opciones.map((opcion, index) => (
          <option key={index} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
    </div>
  );
});


export default MenuDesplegable;
