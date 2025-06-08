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
        this.botonAnterior.onclick = () => this.cambiarDiapositiva(-1);
        this.botonSiguiente.onclick = () => this.cambiarDiapositiva(1);
        this.actualizarCarrusel();
    }

    crearIndicadores() {
        for (let i = 0; i < this.totalDiapositivas; i++) {
            const punto = document.createElement('div');
            punto.className = 'indicador' + (i === 0 ? ' activo' : '');
            this.indicadores.appendChild(punto);
        }
    }

    cambiarDiapositiva(direccion) {
        const nuevoIndice = this.diapositivaActual + direccion;
        if (nuevoIndice >= 0 && nuevoIndice < this.totalDiapositivas) {
            this.diapositivaActual = nuevoIndice;
            this.actualizarCarrusel();
        }
    }

    actualizarCarrusel() {
        this.carrusel.style.transform = `translateX(${-this.diapositivaActual * 100}%)`;

        [...this.indicadores.children].forEach((punto, i) =>
            punto.classList.toggle('activo', i === this.diapositivaActual)
        );

        this.contadorDiapositivas.textContent = `${this.diapositivaActual + 1} / ${this.totalDiapositivas}`;
        this.botonAnterior.disabled = this.diapositivaActual === 0;
        this.botonSiguiente.disabled = this.diapositivaActual === this.totalDiapositivas - 1;
    }
}

document.addEventListener('DOMContentLoaded', () => new CarruselProductos());
