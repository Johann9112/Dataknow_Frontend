import React, { forwardRef } from 'react';

// Componente funcional con forwardRef
const CampoTexto = forwardRef(({ label, type = 'text', ...rest }, ref) => (
  <div className="campo-texto">
    <label>{label}</label>
    <input type={type} {...rest} ref={ref} />
  </div>
));

export default CampoTexto;
