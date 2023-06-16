class Carro {
    pasos = 25;
    vidas = 100;
    posicionX = 0;
    posicionYJugador = 0;
    carroEnemigo = null;

    iniciarPartida() {
        let img = this.crearGif();
        this.actualizarGif(img);
        this.moverAuto(img);
        this.generarCarroEnemigo(img);
        this.porcentajeVida()
    }

    crearGif() {

        let img = document.createElement("img");
        img.style.width = '150px';
        img.style.position = 'absolute';
        img.style.top = '80%';
        img.style.left = window.innerHeight;
        document.body.appendChild(img);
        return img;
    }

    actualizarGif(img) {
        let contador = new Contador();
        contador.iniciarContador();
        let valor;
        setInterval(() => {
            valor = contador.valor;

            if (valor <= 800) {
                img.src = 'Resources/Gameplay/carro_lvl1.png';
            } else if (valor > 800 && valor <= 1400) {
                img.src = 'Resources/Gameplay/Carro_lvl2.jpeg';
            } else if (valor > 1400) {
                img.src = 'Resources/Gameplay/Carro_avanzado.png';
            }
        }, 150);
    }

    moverAuto = (img) => {
        if (this.vidas > 0) {
            document.addEventListener("keydown", (event) => {
                if (event.key === "d" || event.key === 'ArrowRight') {
                    if (this.posicionX + img.offsetWidth <= window.innerWidth) {
                        this.posicionX += this.pasos;
                    }
                } else if (event.key === "a" || event.key === 'ArrowLeft') {
                    if (this.posicionX >= 0) {
                        this.posicionX -= this.pasos;
                    }
                } else if (event.key === "w" || event.key === 'ArrowUp') {
                    if (this.posicionYJugador >= 0) {
                        this.posicionYJugador -= this.pasos;
                    }
                } else if (event.key === "s" || event.key === 'ArrowDown') {
                    if (this.posicionYJugador + img.offsetHeight <= window.innerHeight) {
                        this.posicionYJugador += this.pasos;
                    }
                }

                img.style.left = `${this.posicionX}px`;
                img.style.top = `${this.posicionYJugador}px`;
            });
        }
    }

    generarCarroEnemigo = (img) => {
        setInterval(() => {
            if (this.vidas > 0) {
                let carroObstaculo = document.createElement("img");
                let y = 0;
                let x = this.posicionAleatoriaX();
                carroObstaculo.style.width = '150px';
                carroObstaculo.style.position = 'absolute';
                carroObstaculo.style.top = y + 'px';
                carroObstaculo.style.left = x + "px";
                carroObstaculo.src = this.generarCarroEnemigoAleatorio();

                document.body.appendChild(carroObstaculo);

                setInterval(() => {
                    y += 25;
                    if (y >= window.innerHeight - 150) {
                        document.body.removeChild(carroObstaculo);
                    } else {
                        carroObstaculo.style.top = y + 'px';
                    }
                }, 100);

                setInterval(() => {

                    if (y >= window.innerHeight - 150) {
                        document.body.removeChild(carroObstaculo);
                    }
                }, 3200);

                this.carroEnemigo = carroObstaculo;
                this.avisoColision(carroObstaculo, img);
            }
        }, 3000);
    }

    avisoColision(carroObstaculo, img) {
        setInterval(() => {
            const jugadorRect = img.getBoundingClientRect();
            const obstaculoRect = carroObstaculo.getBoundingClientRect();

            if (
                jugadorRect.left < obstaculoRect.right &&
                jugadorRect.right > obstaculoRect.left &&
                jugadorRect.top < obstaculoRect.bottom &&
                jugadorRect.bottom > obstaculoRect.top
            ) {
                if (this.vidas>0){

                    this.vidas-=4;
                }
                this.perderVidas()
                this.porcentajeVida()
            }
        }, 100);
    }


    //no hace nada
    perderVidas() {

        if (this.vidas === 0) {
            this.finPartida();
        }
    }



    porcentajeVida(){
        let div = document.getElementById("daño");
        div.innerHTML = `<h1>DAÑO RECIVIDO: ${this.vidas}</h1>`
    }
    finPartida() {
        alert("la paritda la terminado")
        let btn = document.createElement("button")
        btn.style.height='150px';
        btn.style.width='150px';
        btn.name='hola'

        document.body.appendChild(btn)

    }

    posicionAleatoriaX() {
        return Math.floor(Math.random() * window.innerWidth);
    }

    generarCarroEnemigoAleatorio() {
        let arrayImg = [
            "/Resources/Gameplay/Carro enemigo 1.png",
            "/Resources/Gameplay/Carro enemigo 2.jpeg",
            "/Resources/Gameplay/Carro enemigo 3.jpeg"
        ];
        let numRandom = Math.floor(Math.random() * arrayImg.length);
        return arrayImg[numRandom];
    }
}
