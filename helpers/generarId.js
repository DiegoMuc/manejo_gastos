

export const generarId = () => {
    const random = Math.random().toString(36).substring(2, 11);
    const fecha = Date.now().toString(36);

    return random + fecha;
}