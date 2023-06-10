class Contador {
    valor = 0

    iniciarContador() {
        let incrementoAleatorio = [1, 2, 3, 4,5]
        let numRandom

        setInterval(() => {
            numRandom = Math.floor(Math.random() * incrementoAleatorio.length)
            this.valor += incrementoAleatorio[numRandom];
            this.mostrarValor()
        }, 100);
    }


    mostrarValor() {
        let div = document.getElementById("Contador");
        div.innerHTML = `<h1>Puntaje: ${this.valor}</h1>`;
    }
}

