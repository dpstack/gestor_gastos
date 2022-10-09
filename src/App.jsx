import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Modal from "./components/Modal";
import Header from "./components/Header";
import { generarId } from "./helpers";

import IconoNuevoGasto from './assets/nuevo-gasto.svg';
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";

function App() {

  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
  const gastosLS = JSON.parse(localStorage.getItem('gastos')) ?? [];

  const [presupuesto, setPresupuesto] = useState(presupuestoLS);
  const [isValid, setIsValid] = useState(false);

  const [modal, setModal] = useState(false);
  const [animacion, setAnimacion] = useState(false);
  const [gastos, setGastos] = useState(gastosLS);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => { setAnimacion(true); }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => { localStorage.setItem('presupuesto', presupuesto ?? 0); }, [presupuesto]);
  useEffect(() => { localStorage.setItem('gastos', JSON.stringify(gastos) ?? []); }, [gastos]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  useEffect(() => { presupuestoLS > 0 &&  setIsValid(true); } , []);

  const handleNuevoGasto = () => {
    setModal(true); setGastoEditar({});

    setTimeout(() => {
      setAnimacion(true);
    }, 500);

  }

  const saveGasto = gasto => {

    if (gasto.id) {
      /* Actualizar */
      const gastosUpdate = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosUpdate);
      setGastoEditar({});
      Swal.fire('Bien Hecho!', 'El gasto se ha actualizado correctamente!', 'success');
    } else {
      /* Agregar Gasto */
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
      Swal.fire('Bien Hecho!', 'El gasto se ha agregado correctamente!', 'success');
    }

    setAnimacion(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const deleteGasto = id => {
    const gastosUpdate = gastos.filter( gasto => gasto.id !== id );
    setGastos(gastosUpdate);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        isValid={isValid}
        setGastos={setGastos}
        setIsValid={setIsValid}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
      />

      {isValid && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              filtro={filtro}
              deleteGasto={deleteGasto}
              setGastoEditar={setGastoEditar}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              onClick={handleNuevoGasto}
              src={IconoNuevoGasto}
              alt="Icono Nuevo Gasto"
            />
          </div>
        </>
      )}

      {modal &&
        <Modal
          setModal={setModal}
          saveGasto={saveGasto}
          animacion={animacion}
          setAnimacion={setAnimacion}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }

    </div>
  )
}

export default App
