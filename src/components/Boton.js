import React from 'react';

const Boton = ({ texto, onClick }) => (
  <button onClick={onClick}>{texto}</button>
);

export default Boton;
