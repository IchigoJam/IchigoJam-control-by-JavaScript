import SerialPort from 'serialport'

const driver = '/dev/tty.SLAB_USBtoUART'
const port = new SerialPort(driver, { baudRate: 115200 })

const exports = {}

exports.command = function (s) {
  port.write(Buffer.from(s + '\n'))
}

exports.sleep = async function (msec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, msec)
  })
}

export default exports
