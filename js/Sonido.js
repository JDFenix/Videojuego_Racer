class Sonido{
    
 sonidoInicio() {

    let audioInicio = document.createElement("audio")
    let audioFondo = document.createElement("audio")

    audioInicio.src = 'Resources/sounds/winsquare-6993.mp3';
    // audioInicio.hidden = true

    audioFondo.src = 'Resources/sounds/8bit-music-for-game-68698.mp3';
    // audioFondo.hidden = true
    // audioFondo.loop = true

    document.body.appendChild(audioInicio)
    document.body.appendChild(audioFondo)

    audioInicio.play();

    setInterval(function () {
        audioFondo.play()
    }, 2500)
}
}