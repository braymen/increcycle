var context = new window.AudioContext()

const clickSound = (event: PointerEvent) => {
    if (!(event.target instanceof Element)) return
    const button = event.target.closest('button')
    if (!button) return
    var osc = context.createOscillator()
    var gain = context.createGain()
    var filter = context.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 50
    var filter2 = context.createBiquadFilter()
    filter2.type = 'highpass'
    filter2.frequency.value = 100
    osc.type = 'triangle'
    osc.frequency.value = Math.random() * 40 + 100
    osc.connect(filter)
    filter.connect(filter2)
    filter2.connect(gain)
    gain.connect(context.destination)
    gain.gain.value = 0.4
    osc.start()
    osc.stop(context.currentTime + 0.07)
}

const reenableSound = async () => {
    if (!context) {
        context = new window.AudioContext()
    }

    if (context.state === 'suspended') {
        await context.resume()
    }
}

export const addSoundEvents = () => {
    document.addEventListener('click', clickSound)
    document.addEventListener('click', reenableSound, { capture: true })
}

export const clearSoundEvents = () => {
    document.removeEventListener('click', clickSound)
    document.removeEventListener('click', reenableSound)
}
