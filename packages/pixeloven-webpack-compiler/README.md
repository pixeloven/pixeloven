# @pixeloven/webpack-compiler

> Pixel Oven webpack-compiler.

See our website [pixeloven-webpack-compiler](https://github.com/pixeloven/pixeloven) for more information or the [issues](https://github.com/pixeloven/pixeloven) associated with this package.

## Install

Using npm:

```sh
npm install --save @pixeloven/webpack-compiler
```

or using yarn:

```sh
yarn add @pixeloven/webpack-compiler
```

## Usage
> Note It is required that we provide a "client" and "server" configuration provide as an array.

The primary function of this module is to act as a wrapper class for webpack's compiler. Additionally it Provides functionality useful for interfacing with webpack's compiler and it's corresponding configuration and output.

1. `create` - This static method will return us a new Compiler instance based on our desired configuration.

```javascript
// webpack.config.js
 
export default [
    {
        name: 'client',
        target: 'web',
        entry: './client.js'
        ...
    }, {
        name: 'server',
        target: 'node',
        entry: './server.js'
        ...
    }
];
```

We can take this configuration and compile it like shown below.
```javascript
import { Compiler } from "@pixeloven/webpack-compiler";
import configs from "./webpack.config.js"

Compiler.create(configs);
```
