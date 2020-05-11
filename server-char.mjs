import SerialPort from 'serialport'
import url from 'url'
import http from 'http'

const driver = '/dev/tty.SLAB_USBtoUART'
const port = new SerialPort(driver, { baudRate: 115200 })

const parser = new SerialPort.parsers.Readline()
port.pipe(parser)
parser.on('data', console.log)

var server = http.createServer()
server.on('request', function (req, res) {
  var path = url.parse(req.url).pathname
  console.log(path)
  const ch = path.charAt(1)
  const color = path.substring(2)
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.write('ok')
  res.end()

  port.write(Buffer.from('C=ASC("' + ch + '"):L=' + color + ':RUN\n'))
})
server.listen(8080)
