import navigator from './WebGPIO.mjs'

const sleep = async msec => new Promise(resolve => setTimeout(resolve, msec))

const main = async function () {
  const gpio = await navigator.requestGPIOAccess()
  const port = gpio.ports.get('LED')
  await port.export('out') // export (activate) the port.
  for (;;) {
    port.write(1)
    await sleep(500)
    port.write(0)
    await sleep(500)
  }
}
main()
