let plugin = require("@parcel/plugin")
module.exports = new plugin.Transformer({
  async transform({ asset }) {
    let wabt = await require("wabt")()
    let data = await asset.getCode()
    let option = {
      exceptions: true,
      mutable_globals: true,
      sat_float_to_int: true,
      sign_extension: true,
      simd: true,
      threads: true,
      multi_value: true,
      tail_call: true,
      bulk_memory: true,
      reference_types: true,
      annotations: true,
      gc: true,
    }
    let wasm = wabt.parseWat("", data, option)
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
