class CarruselProductos {
    constructor() {
        this.carrusel = document.getElementById('carruselProductos');
        this.diapositivas = document.querySelectorAll('.diapositiva-producto');
        this.botonAnterior = document.getElementById('botonAnterior');
        this.botonSiguiente = document.getElementById('botonSiguiente');
        this.indicadores = document.getElementById('indicadoresCarrusel');
        this.contadorDiapositivas = document.getElementById('contadorDiapositivas');

        this.diapositivaActual = 0;
        this.totalDiapositivas = this.diapositivas.length;

        this.iniciar();
    }

    iniciar() {
        this.crearIndicadores();
        this.botonAnterior.onclick = () => this.cambiarDiapositiva(-1);//es  un metodo aparte
        this.botonSiguiente.onclick = () => this.cambiarDiapositiva(1);
        this.actualizarCarrusel(); //metodo aparte
    }

    crearIndicadores() { //Crea puntos del carrusel segun cantidad
        for (let i = 0; i < this.totalDiapositivas; i++) {
            const punto = document.createElement('div');
            punto.className = 'indicador' + (i === 0 ? ' activo' : ''); //condicional ternario
            this.indicadores.appendChild(punto); //agrega un nuevo punto hijo dentro de un elemento padre.
        }
    }

    cambiarDiapositiva(direccion) { //metodo que se encuentra en el metodo iniciar
        const nuevoIndice = this.diapositivaActual + direccion;
        if (nuevoIndice >= 0 && nuevoIndice < this.totalDiapositivas) { //para que no se pase del limite.
            this.diapositivaActual = nuevoIndice;
            this.actualizarCarrusel();
        }
    }

    actualizarCarrusel() {
        this.carrusel.style.transform = `translateX(${-this.diapositivaActual * 100}%)`;

        [...this.indicadores.children].forEach((punto, i) => //hace un recorrido para ver cual es el punto activo y lo marca
            punto.classList.toggle('activo', i === this.diapositivaActual)
        );

        this.contadorDiapositivas.textContent = `${this.diapositivaActual + 1} / ${this.totalDiapositivas}`;//actualiza contadores
        this.botonAnterior.disabled = this.diapositivaActual === 0;//desactiva boton anterior
        this.botonSiguiente.disabled = this.diapositivaActual === this.totalDiapositivas - 1;//desactiva boton siguiente.
    }
}

document.addEventListener('DOMContentLoaded', () => new CarruselProductos()); //crea una instancia de esta clase
