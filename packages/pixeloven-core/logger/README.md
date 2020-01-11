# @pixeloven-core/logger

> Pixel Oven core logger

See our website [PixelOven](https://www.pixeloven.com/) for more information or our [issues](https://github.com/pixeloven/pixeloven/issues) board to report issues associated with this package.

## Install

Using npm:

```sh
npm install --save @pixeloven/node-logger
```

or using yarn:

```sh
yarn add @pixeloven/node-logger
```

## Usage
> Note this package should only be used for node based applications. Using in a client setting may have unintended consequences.

The primary function of this module is to act as a CLI logger. This logger consists of three log levels.

1. `info` - used for standard information and prints normally.
3. `warn` - used for warnings and highlights text in yellow.
1. `error` - Used for errors and highlights text in red.


```javascript
import { logger } from "@pixeloven-core/logger";

logger.info("Some stuff happened");
logger.warn("But not danger seems to be approaching");
logger.error("Welp I'm out!");
```
Each of these methods will print an appropriate icon to at the beginning of each line if the console supports it.