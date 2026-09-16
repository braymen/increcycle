const clickSound = (event: PointerEvent) => {
    const isButton = (event.target as HTMLInputElement).nodeName === 'BUTTON'
    if (!isButton) return
    var context = new window.AudioContext()
    var osc = context.createOscillator()
    var gain = context.createGain()
    osc.type = 'triangle'
    osc.frequency.value = 100
    osc.connect(gain)
    gain.connect(context.destination)
    gain.gain.value = 0.2
    osc.start()
    osc.stop(context.currentTime + 0.05)
}

export const addSoundEvents = () => {
    document.addEventListener('click', clickSound)
}

export const clearSoundEvents = () => {
    document.removeEventListener('click', clickSound)
}
