class Carro {
    pasos = 19;
    vidas = 100;
    posicionX = 0;
    posicionYJugador = 0;
    puntaje;

    iniciarPartida() {
        let img = this.crearGif();
        this.actualizarGif(img);
        this.moverAuto(img);
        this.generarCarroEnemigo(img);
        this.mostrarPorcentajeVida();
        this.generarItemAleatorio(img);
    }

    crearGif() {
        let img = document.createElement("img");
        img.style.width = "150px";
        img.style.position = "absolute";
        img.style.top = "80%";
        img.style.left = "0";
        document.body.appendChild(img);
        return img;
    }

    actualizarGif(img) {
        this.puntaje = new Contador();
        this.puntaje.iniciarContador();
        let valor;
        setInterval(() => {
            valor = this.puntaje.valor;

            if (valor <= 800) {
                img.src = "Resources/Gameplay/carro_lvl1.png";
            } else if (valor > 800 && valor <= 1400) {
                img.src = "Resources/Gameplay/Carro_lvl2.jpeg";

            } else if (valor > 1400) {
                img.src = "Resources/Gameplay/Carro_avanzado.png";

            }
        }, 150);
    }

    generarItemAleatorio = (img) => {
        let div = document.getElementById("carretera");
        setInterval(() => {
            let x = this.posicionAleatoriaX();
            let y = 0;
            let imgItemHeart = document.createElement("img");
            imgItemHeart.src = "/Resources/Gameplay/Heart.png";
            imgItemHeart.style.width = "70px";
            imgItemHeart.style.height = "70px";
            imgItemHeart.style.top = y + "px";
            imgItemHeart.style.position = "absolute";
            imgItemHeart.style.left = x + "px";

            div.appendChild(imgItemHeart);

            let intervalId = setInterval(() => {
                y += 45;

                if (y >= window.innerHeight-100) {
                    div.removeChild(imgItemHeart);
                } else {
                    this.avisoColisionItem(imgItemHeart, img, div);
                }

                imgItemHeart.style.top = y + "px";
            }, 150);
        }, 2000);
    };

    avisoColisionItem(obstaculo, img, div) {
        const jugadorMedidas = img.getBoundingClientRect();
        const obstaculoMedidas = obstaculo.getBoundingClientRect();

        if (
            jugadorMedidas.left < obstaculoMedidas.right &&
            jugadorMedidas.right > obstaculoMedidas.left &&
            jugadorMedidas.top < obstaculoMedidas.bottom &&
            jugadorMedidas.bottom > obstaculoMedidas.top
        ) {
            if (this.vidas < 100) {
                this.vidas += 25;
                div.removeChild(obstaculo);
            }
        }
    }
    moverAuto = (img) => {
        let div = document.getElementById("carretera");
        if (this.vidas > 0) {
            document.addEventListener("keydown", (event) => {

                if (event.key == "d" || event.key == 'ArrowRight') {

                    if (this.posicionX + img.offsetWidth <= window.innerWidth) {
                        this.posicionX += this.pasos;
                    }
                } else if (event.key == "a" || event.key == 'ArrowLeft') {

                    if (this.posicionX >= 0) {
                        this.posicionX -= this.pasos;
                    }

                } else if (event.key == "w" || event.key == 'ArrowUp') {

                    if (this.posicionYJugador >= 0) {
                        this.posicionYJugador -= this.pasos;
                    }

                } else if (event.key == "s" || event.key == 'ArrowDown') {

                    if (this.posicionYJugador + img.offsetHeight <= window.innerHeight) {
                        this.posicionYJugador += this.pasos;
                    }

                }

                img.style.left = `${this.posicionX}px`;
                img.style.top = `${this.posicionYJugador}px`;
            });

        }
    };


    generarCarroEnemigo = (img) => {
        let div = document.getElementById("carretera");
        setInterval(() => {
            let x = this.posicionAleatoriaX();
            let y = 0;
            let imgobstaculo = document.createElement("img");
            imgobstaculo.src = this.generarCarroEnemigoAleatorio();
            imgobstaculo.style.width = "135px";
            imgobstaculo.style.height = "135px";
            imgobstaculo.style.top = y + "px";
            imgobstaculo.style.position = "absolute";
            imgobstaculo.style.left = x + "px";

            div.appendChild(imgobstaculo);

           setInterval(() => {
                y += 25;
                if (y >= window.innerHeight-100) {
                    div.removeChild(imgobstaculo);
                } else {
                    imgobstaculo.style.top = y + "px";
                }
            }, 100);

            this.avisoColision(img, imgobstaculo);
        }, 1800);
    };

    avisoColision(obstaculo, img) {
        setInterval(() => {
            const jugadorMedidas = img.getBoundingClientRect();
            const obstaculoMedidad = obstaculo.getBoundingClientRect();

            if (
                jugadorMedidas.left < obstaculoMedidad.right &&
                jugadorMedidas.right > obstaculoMedidad.left &&
                jugadorMedidas.top < obstaculoMedidad.bottom &&
                jugadorMedidas.bottom > obstaculoMedidad.top
            ) {
                if (this.vidas > 0) {
                    this.vidas -= 4;
                }
                this.perderVidas();
                this.mostrarPorcentajeVida();
            }
        }, 100);
    }

    perderVidas() {
        if (this.vidas === 0) {
            this.finPartida();
        }
    }

    mostrarPorcentajeVida() {
        let div = document.getElementById("daño");

        setInterval(()=>{
            div.innerHTML = `<h1>DAÑO RECIBIDO: ${this.vidas}</h1>`;
        },150)

    }

    finPartida() {
        alert("La partida ha terminado");
    }

    posicionAleatoriaX() {
        let div = document.getElementById("carretera");
        return Math.floor(Math.random() * (div.offsetWidth - 100));
    }

    generarCarroEnemigoAleatorio() {
        let arrayImg = [
            "/Resources/Gameplay/Carro enemigo 1.png",
            "/Resources/Gameplay/Carro enemigo 2.jpeg",
            "/Resources/Gameplay/Carro enemigo 3.jpeg",
        ];
        let numRandom = Math.floor(Math.random() * arrayImg.length);
        return arrayImg[numRandom];
    }
}
