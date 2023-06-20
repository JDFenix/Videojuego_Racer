class Control {
  posicionX = 0;
  posicionY = 0;
  pasos = 30;

  moverAuto = () => {
    let carro = new Carro()
    let img = carro.crearGif()

    document.addEventListener("keydown", (event) => {

      if (event.key == "d" || event.key == 'ArrowRight') {
        this.posicionX += this.pasos;
        img.style.left = `${this.posicionX}px`;

      } else if (event.key == "a" || event.key == 'ArrowLeft') {
        this.posicionX -= this.pasos;
        img.style.left = `${this.posicionX}px`;

      } else if (event.key == "w" || event.key == 'ArrowUp') {
        this.posicionY -= this.pasos;
        img.style.top = `${this.posicionY}px`;

      } else if (event.key == "s" || event.key == 'ArrowDown') {
        this.posicionY += this.pasos;
        img.style.top = `${this.posicionY}px`;
      }
    });

    document.body.appendChild(img);
   
  }

  
}



