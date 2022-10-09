import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({ presupuesto, setPresupuesto, isValid, setIsValid, gastos, setGastos }) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValid ? (
        <ControlPresupuesto 
          setIsValid={setIsValid}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          gastos={gastos} setGastos={setGastos}
        />
      ) : (
        <NuevoPresupuesto
          setIsValid={setIsValid}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
        />
      )}
    </header>
  )
}

export default Header