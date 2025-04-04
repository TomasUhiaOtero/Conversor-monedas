import Selector_moneda from "./Selector_moneda"
import React, { useEffect, useState } from "react";

const Conversor_form = () => {

    const [cantidad, setCantidad] = useState(100);
    const [monedaActual, setMonedaActual] = useState("USD");
    const [monedaTraspaso, setMonedaTraspaso] = useState("EUR");
    const [resultado, setResultado] = useState("");

    const manejoIcono = () => {
        setMonedaActual(monedaTraspaso);
        setMonedaTraspaso(monedaActual)
    }

    const getCambio =  async () => {
        const API_KEY = import.meta.env.VITE_API_KEY
        const API_URL = ` https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${monedaActual}/${monedaTraspaso}`;

        try{
            const response = await fetch(API_URL);
            if (!response.ok)  throw new Error("Error en la solicitud a la API");

            const data = await response.json();
            const rate = (data.conversion_rate*cantidad).toFixed(2); ;
            setResultado(`${cantidad} ${monedaActual} = ${rate} ${monedaTraspaso}`)

        } catch (error) {
            console.error("Error al obtener el tipo de cambio:", error);
        }
    }

    const manejoAceptar = (e) => {
        e.preventDefault();
        getCambio();
    }

    useEffect(() => {
        getCambio();
    }, []);

  return (
    <form action="" className="conversor-form" onSubmit={manejoAceptar}>

        <div className="form-grupo">
          <label className="form-label">Introduce la cantidad deseada: </label>
          <input type="number" className="input-form" value={cantidad} onChange={e => setCantidad(e.target.value)} required/>
        </div>

        <div className="form-grupo form-grupo-moneda">
          <div className="seccion-form">
            <label className="form-label">De:  </label>
            <Selector_moneda  monedaElegida={monedaActual}
                handleMoneda={ e => setMonedaActual(e.target.value) }
            />
          </div>

          <div className="icono-cambio" onClick={manejoIcono}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="34"  height="34"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-exchange"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 8v5a5 5 0 0 1 -5 5h-3l3 -3m0 6l-3 -3" /><path d="M5 16v-5a5 5 0 0 1 5 -5h3l-3 -3m0 6l3 -3" /></svg>
          </div>

          <div className="seccion-form">
            <label className="form-label">A:  </label>
            <Selector_moneda  monedaElegida={monedaTraspaso}
                 handleMoneda={ e => setMonedaTraspaso(e.target.value) }
            />
          </div>
        </div>
        <button type="submit" className="boton-aceptar">Realizar conversión</button>
          <p className="resultado-conversion">{resultado}</p>
      </form>
  )
}

export default Conversor_form
