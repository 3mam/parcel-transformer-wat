# parcel-transformer-wat
This is plugin for [parcel](https://parceljs.org) that compiles **wat** files to **was**, thanks to 
[wabt.js](https://github.com/AssemblyScript/wabt.js/)


## install
> npm i -D parcel-transformer-wat

## config
**.parcelrc**
```javascript
{
  "transformers": {
    "*.{wat,wasm}": ["parcel-transformer-wat"]
  }
}
```

## usage

```javascript
let {addTwo} = await import('./test.wat')
```
Plugin work only with **async** version of **import**.
Plugin contain simple example.