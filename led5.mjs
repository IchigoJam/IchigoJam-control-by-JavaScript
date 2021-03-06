import navigator from './WebGPIO.mjs'

const main = async () => {
  const gpio = await navigator.requestGPIOAccess()
  const port = gpio.ports.get('LED')
  await port.export('out') // export (activate) the port.
  let v = 1
  setInterval(function () {
    port.write(v)
    v = 1 - v
  }, 500)
}
main()
