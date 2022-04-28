let plugin = require("@parcel/plugin")
module.exports = new plugin.Transformer({
  async transform({ asset }) {
    let wabt = await require("wabt")()
    let data = await asset.getCode()
    let wasm = wabt.parseWat("", data)
    asset.type = "js"
    try {
      let { buffer } = wasm.toBinary({
        log: false,
        canonicalize_lebs: false,
        relocatable: false,
        write_debug_names: false,
      })
      let base64 = Buffer.from(buffer).toString("base64")
      let code = `export default _ = Uint8Array.from(atob('${base64}'), c => c.charCodeAt())`
      asset.setCode(code)
    } catch (error) {
      asset.error = error
    }
    return [asset]
  },
})
