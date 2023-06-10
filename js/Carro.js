class Carro {
    vidas = 3

    crearGif = () => {
        let img = document.createElement("img");
        img.src = 'Resources/Gameplay/carro_avanzando.gif';
        img.style.width = '150px';
        img.style.position = 'absolute';
        img.style.marginLeft = '20%'
        return img
      }

    mostrarCorazones() {

        let corazon1 = document.createElement("img")
        corazon1.src = '/Resources/Gameplay/Heart.png'
        corazon1.style.width = '100px'

        let corazon2 = document.createElement("img")
        corazon2.src = '/Resources/Gameplay/Heart.png'
        corazon2.style.width = '100px'

        let corazon3 = document.createElement("img")
        corazon3.src = '/Resources/Gameplay/Heart.png'
        corazon3.style.width = '100px'

        document.body.appendChild(corazon1)
        document.body.appendChild(corazon2)
        document.body.appendChild(corazon3)

        this.perderVidas(corazon3, corazon2, corazon1)
    }


    //Aun no terminado falta que elimine el corazon 2 y 1 ademas de
    // las condiciones de colision

    perderVidas(corazon3, corazon2, corazon1) {

        if (this.vidas == 2) {
            document.body.removeChild(corazon3)
        } else if (this.vidas == 1) {
            document.body.removeChild(corazon2)
        } else if (this.vidas == 0) {
            document.body.removeChild(corazon1)
            this.finPartida()
        }
    }

    
   colisionChoque() {
    var width = window.screen.width;
    var height = window.screen.height;

  }

    finPartida() {
        alert("juego terminado")
    }

}



