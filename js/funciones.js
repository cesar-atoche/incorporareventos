//VARIABLES

const tabla = document.getElementById("tabla-datos");
const inputAgregar = document.querySelector("#inputAgregar");
const filtrar = document.querySelector("#filtrar");
const guardar = document.querySelector("#input-editar");
const buscarbtn = document.querySelector(".btn.btn-outline-success");
const buscartxt = document.querySelector("#buscar");



//EVENTOS

// cargamos los datos
document.addEventListener("DOMContentLoaded", () => {
    for (const iterator of array1) {
        const alcargar = new generadorCodigo(ind, iterator.nombre, iterator.apellido, iterator.genero, iterator.nacimiento, iterator.curso);
        agregaArray(alcargar)
        ind++;
    }
    mostrar(array);
});

//boton agregar Alumno
inputAgregar.addEventListener("click", () => {
    agregarAlumno();
});

//boton guarda nuevo alumno
guardar.addEventListener("click", () => {
    editarAlumno();
});

//select filtra alumnos
filtrar.addEventListener("click", () => {
    filtrarAlumnos();
});

//buscar alumno
buscarbtn.addEventListener("click", () => {
    buscarAlumno();
});



//FUNCIONES

//agrega al array
function agregaArray(objetoCodigo) {
    array.push(objetoCodigo);
}

//imprime  el array
function mostrar(array) {
    tabla.innerHTML = ""
    for (let [key, iterator] of Object.entries(array)) {
        const btnEditar = boton("Editar");
        const btnEliminar = boton("Eliminar");
        //evento click boton editar
        btnEditar.addEventListener("click", () => {
            agregaEdicion(key);
        });
        //evento click boton eliminar
        btnEliminar.addEventListener("click", () => {
            eliminar(key);
        });
        const row = document.createElement('tr');
        row.setAttribute("class", "text-black align-middle");
        row.innerHTML = `
        <td>00${iterator.id}</td>
        <td >${iterator.generaCodigo()}</td>
        <td>${capitalizarPrimeraLetra(iterator.nombre)}</td>
        <td>${capitalizarPrimeraLetra(iterator.apellido)}</td>
        <td>${iterator.validaGenero()}</td>
        <td>${iterator.nacimiento}</td>
        <td>${capitalizarPrimeraLetra(iterator.curso)}</td>
        <td id="tdEditar"></td>
        <td></td>`
        tabla.appendChild(row);
        row.children[7].appendChild(btnEditar)
        row.children[8].appendChild(btnEliminar)
    }
}

//funcion crea boton
function boton(valor) {
    let boton = document.createElement("input");
    boton.setAttribute("type", "button");
    boton.setAttribute("value", valor);
    if (valor == "Editar") {
        boton.setAttribute("class", "btn btn-warning");
        boton.setAttribute("data-bs-target", "#modal-editar");
        boton.setAttribute("data-bs-toggle", "modal");
    }
    else {
        boton.setAttribute("class", "btn btn-danger");
    }
    return boton;
}

//funcion primera letra mayuscula
function capitalizarPrimeraLetra(str) {
    let arrayPalabra = str.split(" ");
    let obtiene = "";
    for (const key in arrayPalabra) {
        let elemento = arrayPalabra[key];
        obtiene += elemento.charAt(0).toUpperCase() + elemento.slice(1) + " ";
    }
    return obtiene;
}

//agrega value en el modal editar
function agregaEdicion(indice) {
    limpiarFormulario("formulario1");
    document.getElementById("edicion-nombre").setAttribute("value", array[indice].nombre);
    document.getElementById("edicion-apellido").setAttribute("value", array[indice].apellido);
    document.getElementById("edicion-genero").setAttribute("value", array[indice].genero);
    document.getElementById("edicion-nacimiento").setAttribute("value", array[indice].nacimiento);
    document.getElementById("edicion-curso").setAttribute("value", array[indice].curso);
    document.getElementById("indice").setAttribute("value", indice);

}

//funcion editar el array
function editarAlumno() {
    let gen = document.getElementById("edicion-genero").value;
    if (gen.toUpperCase() !== "M" && gen.toUpperCase() !== "F") {
        alert('[ERROR] El campo genero debe contener M o F...');
        return false;
    }
    let indice = document.getElementById("indice").value;
    array[indice].nombre = document.getElementById("edicion-nombre").value;
    array[indice].apellido = document.getElementById("edicion-apellido").value;
    array[indice].genero = gen;
    array[indice].nacimiento = document.getElementById("edicion-nacimiento").value;
    array[indice].curso = document.getElementById("edicion-curso").value;
    mostrar(array);
}

//agrega elementos al array
function agregarAlumno() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let genero = document.getElementById("genero").value;
    let nacimiento = document.getElementById("nacimiento").value;
    let curso = document.getElementById("curso").value;
    if (nombre == null || nombre.length == 0) {
        alert('[ERROR] El campo nombre debe tener un valor...');
        return false;
    }
    else if (apellido == null || apellido.length == 0) {
        alert('[ERROR] El campo apellido debe tener un valor...');
        return false;
    }
    else if (genero == "Genero" || genero == "genero") {
        alert('[ERROR] El campo genero debe contener M o F...');
        return false;
    }
    else if (nacimiento == null || nacimiento.length == 0) {
        alert('[ERROR] El campo nacimiento debe tener un valor...');
        return false;
    }
    else if (curso == null || curso.length == 0) {
        alert('[ERROR] El campo curso debe tener un valor...');
        return false;
    }
    const agregado = new generadorCodigo(ind++, nombre, apellido, genero, nacimiento, curso);
    agregaArray(agregado)
    tabla.innerHTML = "";
    mostrar(array)
    limpiarFormulario("formulario")
}

//elimina elementos
function eliminar(indice) {
    array.splice(indice, 1);
    mostrar(array)
}

//funcion limpiar formulario
function limpiarFormulario(nombre) {
    document.getElementById(nombre).reset();
    return true;
}

//funcion busca por nombre
function buscarAlumno() {
    const bus= buscartxt.value;
    const resultado = array.filter(arr => arr.nombre.includes(bus.toLowerCase()));
    mostrar(resultado)
}

function filtrarAlumnos() {
    let arraynuevo = array.map((x) => x);
    let filtrar = document.getElementById("filtrar").value;
    if (filtrar == 1) { //filtra por nombre
        arraynuevo.sort((x, y) => {
            if (x.nombre < y.nombre) { return -1 }
            if (x.nombre > y.nombre) { return 1 }
            return 0
        });
        mostrar(arraynuevo);
    }
    else if (filtrar == 2) { //filtra por apellido
        arraynuevo.sort((x, y) => {
            if (x.apellido < y.apellido) { return -1 }
            if (x.apellido > y.apellido) { return 1 }
            return 0
        });
        mostrar(arraynuevo);
    }
    else if (filtrar == 3) {
        arraynuevo.sort((x, y) => {//filtra por curso
            if (x.curso < y.curso) { return -1 }
            if (x.curso > y.curso) { return 1 }
            return 0
        });
        mostrar(arraynuevo);
    }
    else if (filtrar == 4) {
        arraynuevo.sort((x, y) => {//filtra por genero
            if (x.genero < y.genero) { return -1 }
            if (x.genero > y.genero) { return 1 }
            return 0
        });
        mostrar(arraynuevo);
    }
}
