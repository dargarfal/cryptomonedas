import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Swal from 'sweetalert2'

//Hooks
import useMoneda from '../hooks/useMoneda';
import useCrypto from '../hooks/useCrypto';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
   
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }`;

const Formulario = ({setResult, setviewResult}) => {

  //State listado Criptomonedas
  const [cryptos, setCryptos] = useState([]);

  
  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
    { codigo: 'EUR', nombre: 'Euro'},
    { codigo: 'GBR', nombre: 'Libra Esterlina'},
    { codigo: 'MXN', nombre: 'Peso Mexicano'},
  ]
  
  const [moneda, SelectMonedas] = useMoneda('Elije tu Moneda','', MONEDAS);
  const [crypto, SelectCrypto] = useCrypto('Elije una criptomoneda', '', cryptos);
  
  //Llamando la API
  useEffect(() => {
    
    const fetchData = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    
      const res = await axios.get(url);

      return res.data.Data;
      
    }
    
    fetchData()
      .then(res => setCryptos(res))
      .catch(error => console.log(error))
 
  }, []);

  async function enviarDatos(e) {
    e.preventDefault();
    
    if(moneda === '' || crypto === '' || moneda === '--Seleccione--' || crypto === '--Seleccione--'){
      Swal.fire({
        icon: 'error',
        title: 'Campo no seleccionado',
        text: 'Debe seleccionar ambos campos',
      })
      setviewResult(false);
    }else{
      const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms='+ crypto +'&tsyms='+moneda;
      const res = await axios.get(url);
            
      setResult(res.data.DISPLAY[crypto][moneda]);
      setviewResult(true);
      
    }
    
  }

  return ( 
    <form 
      onSubmit={enviarDatos}
    >
    <SelectMonedas />
    <SelectCrypto / >

    <Boton
        type="submit"
        value="Calcular"
    />
</form>
   );
}
 
export default Formulario;