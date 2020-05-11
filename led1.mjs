import SerialPort from 'serialport'

const driver = '/dev/tty.SLAB_USBtoUART'
const port = new SerialPort(driver, { baudRate: 115200 })

port.write(Buffer.from('LED1\n'))
setTimeout(function () {
  port.write(Buffer.from('LED0\n'))
}, 1000)