class Carro {
  vidas = 100;
  partidaTerminada = false;
  puntaje;
  posicionX = 210;
  posicionY = 500;
  pasos = 30;

  iniciarPartida() {
    let img = this.crearGif();
    this.actualizarGif(img);
    this.moverAuto();
    this.generarCarroEnemigo(img);
    this.mostrarPorcentajeVida();
    this.generarItemAleatorio(img);
  }

  crearGif() {
    let div = document.getElementById("carretera");
    let img = document.createElement("img");
    img.style.width = "80px";
    img.style.position = "absolute";
    img.style.top = "80%";
    img.style.left = div.offsetWidth -400 + "px";
    div.appendChild(img);
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
        img.src = "Resources/Gameplay/Carro_lvl2.png";
      } else if (valor > 1400 && valor <= 1800) {
        img.src = "Resources/Gameplay/Carro_avanzado.png";
      } else if (valor > 1800 && valor < 2300) {
        img.src = "Resources/Gameplay/Carro_lvl4.png";
      } else if (valor > 2300) {
        img.src = "Resources/Gameplay/Carro_lvl5.png";
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

      setInterval(() => {
        y += 45;

        if (y >= window.innerHeight - 100) {
          div.removeChild(imgItemHeart);
        } else {
          this.avisoColisionItem(imgItemHeart, img, div);
        }

        imgItemHeart.style.top = y + "px";
      }, 150);
    }, 22000);
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
      if (this.vidas <= 100) {
        this.vidas += 25;
        div.removeChild(obstaculo);
      }
    }
  }

  moverAuto = () => {
    let divCarretera = document.getElementById("carretera");
    let img = divCarretera.getElementsByTagName("img")[0];

    document.addEventListener("keydown", (event) => {
      const divRect = divCarretera.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

      let nuevaPosicionX = this.posicionX;
      let nuevaPosicionY = this.posicionY;

      if (event.key == "d" || event.key == "ArrowRight") {
        nuevaPosicionX += this.pasos;
      } else if (event.key == "a" || event.key == "ArrowLeft") {
        nuevaPosicionX -= this.pasos;
      } else if (event.key == "w" || event.key == "ArrowUp") {
        nuevaPosicionY -= this.pasos;
      } else if (event.key == "s" || event.key == "ArrowDown") {
        nuevaPosicionY += this.pasos;
      }

      if (
        nuevaPosicionX >= 0 &&
        nuevaPosicionX + imgRect.width <= divRect.width &&
        nuevaPosicionY >= 0 &&
        nuevaPosicionY + imgRect.height <= divRect.height
      ) {
        this.posicionX = nuevaPosicionX;
        this.posicionY = nuevaPosicionY;

        img.style.left = `${this.posicionX}px`;
        img.style.top = `${this.posicionY}px`;
      }
    });
  };

  generarCarroEnemigo = (img) => {
    let div = document.getElementById("carretera");
    setInterval(() => {
      let x = this.posicionAleatoriaX();
      let y = 0;
      let imgobstaculo = document.createElement("img");
      imgobstaculo.src = this.generarCarroEnemigoAleatorio();
      imgobstaculo.style.width = "150px";
      imgobstaculo.style.height = "150px";
      imgobstaculo.style.top = y + "px";
      imgobstaculo.style.position = "absolute";
      imgobstaculo.style.left = x + "px";

      div.appendChild(imgobstaculo);

      setInterval(() => {
        y += 25;
        if (y >= window.innerHeight - 130) {
          div.removeChild(imgobstaculo);
        } else {
          imgobstaculo.style.top = y + "px";
        }
      }, 100);

      this.avisoColision(img, imgobstaculo);
    }, 1900);
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
        this.finPartida();
        this.mostrarPorcentajeVida();
      }
    }, 100);
  }

  mostrarPorcentajeVida() {
    let div = document.getElementById("daño");

    setInterval(() => {
      if (this.vidas >= 0 && this.vidas <= 100) {
        if (this.vidas <= 0) {
          this.vidas = 0;
        }
        div.innerHTML = `<h1>DAÑO RECIBIDO: ${this.vidas}</h1>`;
      }
    }, 150);
  }

  finPartida() {
    if (this.vidas <= 0 && this.partidaTerminada === false) {
      this.partidaTerminada = true; // Bandera para indicar que la partida ha terminado
      alert("La partida ha terminado");
      setTimeout(() => {
        window.location.href = "game over.html";
      }, 1500);
    }
  }

  posicionAleatoriaX() {
    let div = document.getElementById("carretera");
    return Math.floor(Math.random() * (div.offsetWidth - 100));
  }

  generarCarroEnemigoAleatorio() {
    let arrayImg = [
      "/Resources/Gameplay/Carro enemigo 4.png",
      "/Resources/Gameplay/Carro enemigo 5.png",
      "/Resources/Gameplay/Carro enemigo 6.png",
      "/Resources/Gameplay/Carro enemigo 7.png",
      "/Resources/Gameplay/Carro enemigo 9.png",
    ];
    let numRandom = Math.floor(Math.random() * arrayImg.length);
    return arrayImg[numRandom];
  }
}
