import Gasto from "./Gasto";
import { useEffect, useState } from "react";

const ListadoGastos = ({ gastos, setGastoEditar, deleteGasto, filtro, gastosFiltrados }) => {

  const [header, setHeader] = useState('');

  useEffect(() => {
    if (gastosFiltrados.length > 0) { setHeader('Resultados'); }
    else { setHeader('No hay resultados') }
  }, [gastosFiltrados]);

  return (
    <div className="contenedor listado-gastos">
      {filtro ? (
        <>
          <h2>{header}</h2>
          {gastosFiltrados.map(gasto => (
            <Gasto
              gasto={gasto}
              key={gasto.id}
              deleteGasto={deleteGasto}
              setGastoEditar={setGastoEditar}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{gastos.length ? 'Gastos' : 'No hay gastos aún'}</h2>
          {gastos.map(gasto => (
            <Gasto
              gasto={gasto}
              key={gasto.id}
              deleteGasto={deleteGasto}
              setGastoEditar={setGastoEditar}
            />
          ))}
        </>
      )
      }
    </div>
  )
}

export default ListadoGastos