class Carro {
    posicionX = 0;
    posicionY = 0;
    pasos = 30;
    vidas = 3;


    crearGif() {
        var img = document.createElement("img");
        img.style.width = '150px';
        img.style.position = 'absolute';
        img.style.marginLeft = '20%';
        document.body.appendChild(img);

        return img
    }


    /// mmuestra el gif pero no lo actualiza envia al else directamente 
    actualizarGif() {
        let img = this.crearGif()
        let contador
        let valor
        setInterval(() => {
            contador = new Contador()
            valor = contador.valor
            // console.log(contador.valor)
        }, 150)


        if (valor <= 200) {
            img.src = 'Resources/Gameplay/carro_lvl1.gif';
        } else if (valor > 200 && valor <= 300) {
            img.src = 'Resources/Gameplay/Carro_lvl2.gif';
        } else {
            img.src = 'Resources/Gameplay/carro_avanzando.gif';
        }

        this.moverAuto(img)
    }


    moverAuto = (img) => {
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

                if (this.posicionY >= 0) {
                    this.posicionY -= this.pasos;
                }

            } else if (event.key == "s" || event.key == 'ArrowDown') {

                if (this.posicionY + img.offsetHeight <= window.innerHeight) {
                    this.posicionY += this.pasos;
                }
                
            }

            img.style.left = `${this.posicionX}px`;
            img.style.top = `${this.posicionY}px`;
        });
       
    }


    avisoColision() {
        if (
            this.posicionX <= 0 ||
            this.posicionX + img.offsetWidth >= window.innerWidth ||
            this.posicionY <= 0 ||
            this.posicionY + img.offsetHeight >= window.innerHeight
        ) {
            this.perdder();
        }
    }

    perdder() {
        console.log("hello")
    }



    mostrarCorazones() {


        var corazon1 = document.createElement("img");
        corazon1.src = 'Resources/Gameplay/Heart.png';
        corazon1.style.width = '100px';

        var corazon2 = document.createElement("img");
        corazon2.src = 'Resources/Gameplay/Heart.png';
        corazon2.style.width = '100px';

        var corazon3 = document.createElement("img");
        corazon3.src = 'Resources/Gameplay/Heart.png';
        corazon3.style.width = '100px';

        document.body.appendChild(corazon1);
        document.body.appendChild(corazon2);
        document.body.appendChild(corazon3);

        this.perderVidas(corazon3, corazon2, corazon1);
    }



    perderVidas(corazon3, corazon2, corazon1) {

        if (this.vidas === 2) {
            document.body.removeChild(corazon3);
        } else if (this.vidas === 1) {
            document.body.removeChild(corazon2);
        } else if (this.vidas === 0) {
            document.body.removeChild(corazon1);
            this.finPartida();
        }
    }

    finPartida() {
        alert("Juego terminado");
    }
}
