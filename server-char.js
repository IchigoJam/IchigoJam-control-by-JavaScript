'use strict'

const driver = '/dev/tty.SLAB_USBtoUART'
const SerialPort = require('serialport')
const port = new SerialPort(driver, { baudRate: 115200 })

var parser = new SerialPort.parsers.Readline
port.pipe(parser)
parser.on('data', console.log)

const url = require('url')
var server = require('http').createServer()
server.on('request', function(req, res) {
    var path = url.parse(req.url).pathname
    console.log(path)
    const ch = path.charAt(1)
    const color = path.substring(2)
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' })
    res.write('ok')
    res.end()

    port.write(Buffer.from('C=ASC("' + ch + '"):L=' + color + ':RUN\n'))
})
server.listen(8080)
