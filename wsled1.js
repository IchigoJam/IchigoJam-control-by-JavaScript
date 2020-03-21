const ij = require('./ichigojam.js')

const main = async function() {
  ij.command('[0]=30:WS.LED 20')
  await ij.sleep(1000)
  ij.command('CLV:WS.LED 20')
}
main()
