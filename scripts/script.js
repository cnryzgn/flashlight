const flashlight = document.querySelector('.flashlight')
const flashlightVoiceEffect = document.querySelector('#flashlight-switch-effect')
const rainVoiceEffect = document.querySelector('#rain-effect')
const flashlightInfo = document.querySelector('.flashlight-info')

flashlightVoiceEffect.playbackRate = 2
rainVoiceEffect.volume = 0.250

function mouseEventHandler(e) {
    const { pageX, pageY } = e

    flashlight.style.left = `${pageX}px`
    flashlight.style.top = `${pageY}px`
    flashlight.animate([
        { left: (pageX - 5) + 'px', top: (pageY - 5) + 'px' },
        { left: (pageX + 5) + 'px', top: (pageY + 5) + 'px' },
        { left: (pageX - 5) + 'px', top: (pageY - 5) + 'px' }
    ], {
        duration: 1400,
        iterations: Infinity
    })
}


document.body.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        if (flashlight.classList.contains('flashlight-open')) {
            flashlight.classList.remove('flashlight-open')
            document.body.removeEventListener('mousemove', mouseEventHandler)

            flashlightInfo.style.display = 'block'
            flashlightVoiceEffect.play()

            rainVoiceEffect.pause()
        } else {
            flashlight.classList.add('flashlight-open')
            document.body.addEventListener('mousemove', mouseEventHandler)
            flashlightInfo.style.display = 'none'
            flashlightVoiceEffect.play()

            rainVoiceEffect.play()
        }
    }
})