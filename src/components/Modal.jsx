import { useEffect, useState } from 'react';
import IconoCerrarModal from '../assets/cerrar.svg';
import Mensaje from './Mensaje';

const Modal = ({ setModal, animacion, setAnimacion, saveGasto, gastoEditar, setGastoEditar }) => {

    const [mensaje, setMensaje] = useState('');

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');

    const [id, setId] = useState('');

    useEffect(() => {
        if ( Object.keys(gastoEditar).length > 0 ) { 
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, [])
    

    const handleSubmit = e => {
        e.preventDefault();

        if ([ nombre, cantidad, categoria ].includes('')) {
            setMensaje('Todos los campos son obligatorios!');
            setTimeout(() => {
                setMensaje('')
            }, 2000);
            return;
        }

        saveGasto({nombre, cantidad, categoria, id, fecha});

    }

    const hideModal = () => {
        setAnimacion(false);
        setGastoEditar({});

        setTimeout(() => {
            setModal(false);
        }, 500);
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={IconoCerrarModal} alt="Cerrar Modal" onClick={hideModal} />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animacion ? 'animar' : 'cerrar'}`}>
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> }
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    id='nombre' type="text" value={nombre}
                    placeholder='Añade el nombre del gasto'
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    id='cantidad' type="number" value={cantidad}
                    placeholder='Añade la cantidad del gasto: ej. 300'
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>
            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select
                    className='minimal'
                    id='categoria' value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                    <option value="" disabled>-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                    <option value="gastos">Gastos Varios</option>
                </select>
            </div>
            <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
        </form>
    </div>
  )
}

export default Modal