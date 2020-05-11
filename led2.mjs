import SerialPort from 'serialport'

const driver = '/dev/tty.SLAB_USBtoUART'
const port = new SerialPort(driver, { baudRate: 115200 })

const command = function (s) {
  port.write(Buffer.from(s + '\n'))
}

const sleep = async function (msec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, msec)
  })
}

const main = async function () {
  command('LED1')
  await sleep(1000)
  command('LED0')
}
main()
