import SerialPort from 'serialport'
import http from 'http'
import readline from 'readline'

const PORT = 8080
const driver = '/dev/tty.SLAB_USBtoUART'
const port = new SerialPort(driver, { baudRate: 115200 })

const parser = new SerialPort.parsers.Readline()
const buf = []
parser.on('data', function (data) {
  buf.push(data)
})
port.pipe(parser)

const reader = readline.createInterface({ input: process.stdin })
reader.on('line', function (line) {
  port.write(Buffer.from(line + '\n'))
})

const server = http.createServer()
server.on('request', function (req, res) {
  // port.write(Buffer.from('C=ASC("' + ch + '"):L=' + color + ':RUN\n'))

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('hello world')
  res.end()
})
server.listen(PORT)
