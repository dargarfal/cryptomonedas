import React from 'react';
import PropTypes from 'prop-types';

const Resultado = ({result}) => {
  
  
  return ( 
    <div className="resultado">
      <h2>El precio es: {result.PRICE}</h2>
      <p>Precio más alto del día: <span>{result.HIGHDAY}</span></p>
      <p>Precio más bajo del día: <span>{result.LOWDAY}</span></p>
      <p>Variación últimas 24 horas: <span>{result.CHANGEDAY}</span></p>
      <p>Última actualización: <span>{result.LASTUPDATE}</span></p>

    </div>
  
   );
}

Resultado.propTypes = {
  result: PropTypes.object.isRequired
}
 
export default Resultado;