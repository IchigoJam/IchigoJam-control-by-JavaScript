import ij from './ichigojam.mjs'
import fetch from 'node-fetch'

const main = async function () {
  ij.command('CLV:WS.LED20')

  const url = 'https://www.stopcovid19.jp/data/covid19japan.json'
  const data = await (await fetch(url)).json()
  const ratio = 1 - data.ncurrentpatients / data.nbedforinfection
  console.log('現在患者数', data.ncurrentpatients, '感染病床数', data.nbedforinfection, '空き病床数（推測）', ratio)

  const nr = isNaN(ratio) ? 20 : Math.floor(ratio * 20)
  console.log(nr)
  ij.command(`FORI=0TO${nr}:[I*3+1]=30:NEXT:WS.LED20`)
}
main()
