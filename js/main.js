let carro = new Carro()

carro.mostrarCorazones()

function Iniciar() {
    let sonido = new Sonido();
    sonido.sonidoInicio();

    let contadors = new Contador();
    contadors.iniciarContador();
    
    carro.actualizarGif()
    carro.generarCarroEnemigo()

}






