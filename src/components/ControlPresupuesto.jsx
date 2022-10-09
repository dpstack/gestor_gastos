import Swal from "sweetalert2";
import { formatMoney } from "../helpers";
import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValid }) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [disponible, setDisponible] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        const newPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        setTimeout(() => {
            setPorcentaje(newPorcentaje);
        }, 1500);

        setDisponible(totalDisponible);
        setGastado(totalGastado);
    }, [gastos])

    const handleResetApp = () => {
        Swal.fire({
            title: '¿Deseas reiniciar tus gastos y presupuesto?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No reiniciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Se ha reiniciado correctamente!', '', 'success')
                setGastos([]);
                setPresupuesto(0);
                setIsValid(false);
            } else if (result.isDenied) {
                Swal.fire('No se ha reiniciado', '', 'warning')
            }
        })
    }

    return (
        <div className="contenedor contenedor-presupuesto sombra dos-columnas">
            <div className="">
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#E5E5E5',
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button onClick={handleResetApp} className="reset-app">
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatMoney(presupuesto)}
                </p>
                <p className={`${disponible < 0 && 'negativo'}`}>
                    <span>Disponible: </span> {formatMoney(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {formatMoney(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto