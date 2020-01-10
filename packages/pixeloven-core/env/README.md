# @pixeloven-core/env

> Pixel Oven env.

See our website [PixelOven](https://www.pixeloven.com/) for more information or our [issues](https://github.com/pixeloven/pixeloven/issues) board to report issues associated with this package.


## Install

Using npm:

```sh
npm install --save @pixeloven-core/env
```

or using yarn:

```sh
yarn add @pixeloven-core/env
```

## Usage
> Note this package should only be used for node based applications. Using in a client setting may have unintended consequences.

This package acts as a simple wrapper for [dotenv](https://www.npmjs.com/package/dotenv) and a light weight interface for accessing our `.env` file variables. The philosophy for this project enforces only a single **environment** file aptly named `.env`. It is our opinion that having multiple `.env` definitions is an anti-pattern and should be discouraged.

The ideal setup for this particular configuration is to have a single `.env` file that's not committed to source control and instead should be manged the deployment process (or local development environment). Of course the deployment process may simply be pre-defined `.env-{template}` files in source that get *deployed* based on environment but these details we leave to you. :heart:

Alright, enough lecturing let's get to coding! ;)

To use this package is simple. For example let use the following `.env` file as an example.
```
PORT=8080
HOST=localhost
PROTOCOL=http
PUBLIC_URL=/
BUILD_PATH=dist
LOG_LEVEL=debug
MACHINE=host
DOMAIN=pixeloven.com
```
The above ENV variables are some examples of common configurations used in our projects some of which are even defined in this package. Of course more variables can be added by simply following the below pattern.

```
VARIABLE_NAME=value
```

Now, in some cases it is required to defined environment variables at run time. For example if we wanted to bootstrap our build script to create a production build of our application.
```javascript
import { env, Environment } from "@pixeloven/env";

/**
 * Initialize env variables from file
 */
env.load();

/**
 * Setup production environment
 */
const environment: Environment = "production";
env.define("BABEL_ENV", environment);
env.define("NODE_ENV", environment);
```
Once again this packages pre-defines a few common variables and even provides type definitions but we are not limited to just what is defined by this package.

Enjoy! 
