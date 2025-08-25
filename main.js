function nombre(){
    return "David";
}

const usuario = nombre();

function saludar(nombre) {
    nombre = usuario;
    return `¡Hola, ${nombre}!`;
}   

console.log(saludar(usuario));
