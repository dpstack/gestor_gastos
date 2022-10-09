import Gasto from "./Gasto";

const ListadoGastos = ({ gastos, setGastoEditar, deleteGasto, filtro, gastosFiltrados }) => {
  return (
    <div className="contenedor listado-gastos">
      {filtro ? (
        <>
          <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay resultados'}</h2>
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