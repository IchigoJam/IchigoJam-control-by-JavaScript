import ij from './ichigojam.mjs'

class GPIOPort {
  async export (dir) { // '', 'in', 'out'
    this.direction = dir
    this.exported = true
  }

  async unexport () {
    if (this.exported) {
      this.exported = false
      throw new Error('not implemented yet')
    }
  }

  async read () {
    throw new Error('not implemented yet')
    // return readValue()
  }

  async write (value) {
    ij.command(`OUT${this._out},${value ? 1 : 0}`)
    await ij.sleep(100) // TODO: wait reply
  }
}

class GPIOAccess {
  constructor (gpioportmap) {
    this.ports = gpioportmap
    this.onchange = null
  }

  async unexportAll () {
    this.ports.values(port => port.unexport()) // todo: wait all
  }
}
class GPIOPortMap {
  constructor (gpios) {
    this._map = new Map()
    gpios.forEach(p => this._map.set(p.portName, p))
  }

  keys (f) {
    this._map.keys(f)
  }

  values (f) {
    this._map.values(f)
  }

  get (key) {
    return this._map.get(key)
  }
}

const requestGPIOAccess = async function () {
  const ports = [
    [3, 'IN1', 1, 8],
    [4, 'IN2', 2, 9],
    [5, 'IN3', 3, 10],
    [6, 'IN4', 4, 11],
    [9, 'OUT1', 5, 1],
    [10, 'OUT2', 6, 2],
    [11, 'OUT3', 7, 3],
    [12, 'OUT4', 8, 4],
    [18, 'OUT5', 10, 5],
    [17, 'OUT6', 11, 6],
    [13, 'BTN', 9, -1],
    [14, 'LED', -1, 7]
  ]
  const gpioports = ports.map(p => {
    const port = new GPIOPort()
    port.portNumber = p[0]
    port.portName = p[1]
    port.pinName = p[1]
    port.direction = null
    port.exportend = false
    port.onchange = null
    port._in = p[2]
    port._out = p[3]
    return port
  })
  const gpiomap = new GPIOPortMap(gpioports)
  const gpioaccess = new GPIOAccess(gpiomap)

  /*
  // TODO: check in ports
  setInterval(function {
    // check all in port & exported & onchange
    const e = { value: n, port: port }
    port.onchange(e)

  }, 100)
  */
  return gpioaccess
}

export default { requestGPIOAccess }
