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
    if (path == '/' || path == '/a' || path == '/b') {
        res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' })
        res.write('<a href=a>LED1</a><br>')
        res.write('<a href=b>LED0</a><br>')
        res.end()
        if (path == '/a') {
            port.write(Buffer.from('led1\n'))
        } else if (path == '/b') {
            port.write(Buffer.from('led0\n'))
        }
    } else {
        res.writeHead(404, { 'Content-Type' : 'text/plain' })
        res.write('404 not found')
        res.end()
    }
})
server.listen(8080)
