const flashlight = document.querySelector('.flashlight')
const flashlightVoiceEffect = document.querySelector('#flashlight-switch-effect')
const rainVoiceEffect = document.querySelector('#rain-effect')
const flashlightInfo = document.querySelector('.flashlight-info')

flashlightVoiceEffect.playbackRate = 2
rainVoiceEffect.volume = 0.250

function mouseEventHandler(e) {
    const { pageX, pageY } = e

    const flashlightWidth = flashlight.offsetWidth
    const flashlightHeight = flashlight.offsetHeight

    flashlight.style.left = `${pageX - flashlightWidth / 2}px`
    flashlight.style.top = `${pageY - flashlightHeight / 2}px`
    flashlight.animate([
        { left: (pageX - 5 - flashlightWidth / 2) + 'px', top: (pageY - 5 - flashlightHeight / 2) + 'px' },
        { left: (pageX + 5 - flashlightWidth / 2) + 'px', top: (pageY + 5 - flashlightHeight / 2) + 'px' },
        { left: (pageX - 5 - flashlightWidth / 2) + 'px', top: (pageY - 5 - flashlightHeight / 2) + 'px' }
    ], {
        duration: 1400,
        iterations: Infinity
    })
}

function touchEventHandler(e) {
    const touch = e.touches[0]

    const flashlightWidth = flashlight.offsetWidth
    const flashlightHeight = flashlight.offsetHeight

    const { pageX, pageY } = touch


    flashlight.style.left = `${pageX}px`
    flashlight.style.top = `${pageY}px`
    flashlight.animate([
        { left: (pageX - 5 - flashlightWidth / 2) + 'px', top: (pageY - 5 - flashlightHeight / 2) + 'px' },
        { left: (pageX + 5 - flashlightWidth / 2) + 'px', top: (pageY + 5 - flashlightHeight / 2) + 'px' },
        { left: (pageX - 5 - flashlightWidth / 2) + 'px', top: (pageY - 5 - flashlightHeight / 2) + 'px' }
    ], {
        duration: 1400,
        iterations: Infinity
    })
}

function flashlightMobile() {
    let lasTap = 0
    const delay = 300

    document.body.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime()
        const tapLen = currentTime - lasTap

        if (tapLen < delay && tapLen > 0) {

            if (flashlight.classList.contains('flashlight-open')) {
                flashlight.classList.remove('flashlight-open')

                document.body.removeEventListener('touchmove', touchEventHandler)

                flashlightInfo.style.display = 'block'

                flashlightVoiceEffect.play()
                rainVoiceEffect.pause()
            } else {
                flashlight.classList.add('flashlight-open')

                document.body.addEventListener('touchmove', touchEventHandler)

                flashlightInfo.style.display = 'none'

                flashlightVoiceEffect.play()
                rainVoiceEffect.play()
            }
        } else {
            lasTap = currentTime
        }
    })
}

function flashlightPC() {

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

}
function checkDevice() {
    const android = /Android/i, ios = /iPhone|iPad|iPod/i
    const userAgent = navigator.userAgent

    if (android.test(userAgent) || ios.test(userAgent)) {
        return { type: 1, description: 'Mobile' }
    } else {
        return { type: 2, description: 'PC' }
    }
}

function main() {
    const device = checkDevice()

    if (device.type === 1) {
        flashlightMobile()
    }

    if (device.type === 2) {
        flashlightPC()
    }
}

main()