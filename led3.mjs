import ij from './ichigojam.mjs'

const main = async function () {
  ij.command('LED1')
  await ij.sleep(1000)
  ij.command('LED0')
}
main()
