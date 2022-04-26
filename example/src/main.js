console.log('Hello, world!')

async function main() {
  let {addTwo} = await import('./test.wat')
  document.body.innerHTML = `2+2=${addTwo(2,2)}`
}

main()