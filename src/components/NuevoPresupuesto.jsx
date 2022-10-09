import { useState } from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValid }) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = e => {
        e.preventDefault();
        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto válido');
            return;
        }

        setMensaje('');
        setIsValid(true)
    }

    return (
        <div className="contenedor contenedor-presupuesto sombra">
            <form className="formulario" onSubmit={handlePresupuesto}>
                <div className="campo">
                    <label>Definir Presupesto</label>
                    <input
                        type="number" min={0}
                        className="nuevo-presupuesto" value={presupuesto}
                        onChange={e => setPresupuesto(Number(e.target.value))}
                        placeholder='Añade tu Presupuesto'
                    />
                </div>
                <input type="submit" value="Añadir" />
                { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> }
            </form>
        </div>
    )
}

export default NuevoPresupuesto