# parcel-transformer-wat
This is plugin for [parcel](https://parceljs.org) that compiles **wat** files to **was**, thanks to 
[wabt.js](https://github.com/AssemblyScript/wabt.js/)


## install
> npm i -D parcel-transformer-wat

## config
**.parcelrc**
```javascript
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.wat": ["parcel-transformer-wat"]
  }
}
```

## usage

```javascript
import foo from './foo.wat'
let wasm = await WebAssembly.instantiate(foo)
```

Plugin contain simple example on git repo.