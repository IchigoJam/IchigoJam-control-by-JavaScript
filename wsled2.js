const ij = require('./ichigojam.js')

const main = async function() {
  for (let i = 0; i < 20; i++) {
    ij.command(`[${i * 3 + 1}]=30:WS.LED20`)
    await ij.sleep(500)
  }
}
main()
