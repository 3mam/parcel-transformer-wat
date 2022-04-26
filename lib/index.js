let plugin = require('@parcel/plugin')
module.exports = new plugin.Transformer({
  async transform({ asset }) {
    if (asset.type !== 'wat')
      return

    asset.type = 'wasm'
    let wabt = await require('wabt')()
    let code = await asset.getCode()
    let wasm = wabt.parseWat('', code)
    try {
      let { buffer } = wasm.toBinary({
        log: false,
        canonicalize_lebs: false,
        relocatable: false,
        write_debug_names: false
      })
      asset.setBuffer(buffer)
    } catch (error) {
      asset.error = error
    }
    return [asset]
  }
})