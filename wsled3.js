const ij = require('./ichigojam.js')
const fetch = require('node-fetch')

const main = async function() {
  ij.command('CLV:WS.LED20')

  const url = 'https://app.sabae.cc/api/covid19japan_summary.json'
  const data = await (await fetch(url)).json()
  const ratio = 1 - data.ncurrentpatients / data.nbedforinfection
  console.log('現在患者数', data.ncurrentpatients, '感染病床数', data.nbedforinfection, '空き病床数（推測）', ratio)

  const nr = Math.floor(ratio * 20)
  ij.command(`FORI=0TO${nr}:[I*3+1]=30:NEXT:WS.LED20`)


}
main()
