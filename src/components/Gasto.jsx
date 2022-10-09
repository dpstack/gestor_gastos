import {
    TrailingActions, SwipeableListItem,
    SwipeAction, SwipeableList, LeadingActions
} from "react-swipeable-list";
import 'react-swipeable-list/dist/styles.css';
import { formatDate, formatMoney } from "../helpers";

import IconoAhorro from '../assets/icono_ahorro.svg';
import IconoComida from '../assets/icono_comida.svg';
import IconoCasa from '../assets/icono_casa.svg';
import IconoOcio from '../assets/icono_ocio.svg';
import IconoSalud from '../assets/icono_salud.svg';
import IconoSubs from '../assets/icono_suscripciones.svg';
import IconoVarios from '../assets/icono_gastos.svg';

const iconosDict = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSubs,
    gastos: IconoVarios
}

const Gasto = ({ gasto, setGastoEditar, deleteGasto }) => {

    const { categoria, nombre, cantidad, fecha, id } = gasto;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => deleteGasto(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img src={iconosDict[categoria]} alt="Icono Gasto" />
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <div className="fecha-gasto">
                                Agregado el: {''}
                                <span>{formatDate(fecha)}</span>
                            </div>
                        </div>
                    </div>
                    <p className="cantidad-gasto">{formatMoney(cantidad)}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto