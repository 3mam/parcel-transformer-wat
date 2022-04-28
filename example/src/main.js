import foo from "./test.wat"
console.log("Hello, World!")

async function main() {
  let { addTwo } = await (await WebAssembly.instantiate(foo)).instance.exports
  document.body.innerHTML = `2+2=${addTwo(2, 2)}`
}
main()
