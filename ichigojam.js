const driver = '/dev/tty.SLAB_USBtoUART'
const SerialPort = require('serialport')
const port = new SerialPort(driver, { baudRate: 115200 })

exports.command = function(s) {
  port.write(Buffer.from(s + '\n'))
}

exports.sleep = async function(msec) {
  return new Promise(function(resolve) {
    setTimeout(resolve, msec)
  })
}
