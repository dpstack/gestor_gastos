export const generarId = () => {
    const fecha = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2);
    return random + fecha;
}

export const formatDate = fecha => {
    const newDate = new Date(fecha);
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return newDate.toLocaleDateString('es-ES', options);
}

export const formatMoney = cantidad => {
    return cantidad.toLocaleString('es-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    })
}