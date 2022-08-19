class generadorCodigo {
    constructor(id, nombre, apellido, genero, nacimiento, curso) {
        this.id = id;
        this.nombre = nombre.toLowerCase();
        this.apellido = apellido.toLowerCase();
        this.genero = genero;
        this.nacimiento = nacimiento;
        this.curso = curso.toLowerCase();
    }
    obtienePrimerDigito(cadena) { //obtiene primer digito de cada palabra de cadena con espacios
        let arrayPalabra = cadena.split(" ");
        let obtiene = "";
        for (const key in arrayPalabra) {
            let elemento = arrayPalabra[key];
            obtiene += elemento.substring(0, 1);
        }
        return obtiene;
    }
    obtienePrimerDigitoNacimiento(cadena) { //obtiene primer digito de la fecha de nacimiento (dia/mes/año)
        let arrayPalabra = cadena.split("-");
        let obtiene = "";
        for (const key in arrayPalabra) {
            let elemento = arrayPalabra[key];
            obtiene += elemento.substring(0, 1);
        }
        return obtiene;
    }
    generaCodigo() {//genera codigo 
        let codigo = `A${this.obtienePrimerDigito(this.nombre)}`;
        codigo += this.obtienePrimerDigito(this.apellido);
        codigo += this.obtienePrimerDigitoNacimiento(this.nacimiento);
        codigo += this.genero;
        return codigo.toUpperCase();
    }
    validaGenero() {
        let string = "";
        if (this.genero == "M" || this.genero == "m") {
            string = "Masculino";
        }
        else {
            string = "Femenino"
        }
        return string;
    }

}

var array = [];
//agrego datos al index con un array
let array1 = [
    { nombre: 'Cesar Alexis', apellido: 'Atoche Paredes', genero: 'M', nacimiento: '1984-04-09', curso: 'JavaScript' },
    { nombre: 'Nicolle Valentina', apellido: 'Cuellar Montenegro', genero: 'F', nacimiento: '1997-07-04', curso: 'Python' },
    { nombre: 'Diofinis', apellido: 'Ballesteros Castro', genero: 'M', nacimiento: '1990-08-03', curso: 'Sql' },
    { nombre: 'Juan Carlos', apellido: 'Perez pio', genero: 'M', nacimiento: '1995-07-15', curso: 'JavaScript' },
    { nombre: 'Cesar Alexis', apellido: 'Atoche Paredes', genero: 'M', nacimiento: '1984-04-09', curso: 'JavaScript' },
    { nombre: 'Nicolle Valentina', apellido: 'Cuellar Montenegro', genero: 'F', nacimiento: '1997-07-04', curso: 'Python' },
    { nombre: 'Diofinis', apellido: 'Ballesteros Castro', genero: 'M', nacimiento: '1990-08-03', curso: 'Sql' },
    { nombre: 'Juan Carlos', apellido: 'Perez pio', genero: 'M', nacimiento: '1995-07-15', curso: 'JavaScript' },
    

];
let ind = 0;
