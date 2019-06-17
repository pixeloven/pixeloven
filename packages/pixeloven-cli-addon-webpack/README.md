# @pixeloven/cli-addon-webpack

> Pixel Oven cli addon for webpack

See our website [pixeloven-cli-addon-webpack](https://github.com/pixeloven/pixeloven) for more information or the [issues](https://github.com/pixeloven/pixeloven) associated with this package.

## Features
This addon is meant to allow the CLI to use webpack as a bundler on top of a a TypeScript compiler. It includes many of the plugins and features expected from a fully production ready JavaScript application. Also included is a completely custom development server built to handle both client and server side  JavaScript development.

> TBD This section is a work in progress

## Install

Using npm:

```sh
npm install --save-dev @pixeloven/cli-addon-webpack
```

or using yarn:

```sh
yarn add --dev @pixeloven/cli-addon-webpack
```

## Usage
For developing in application with webpack use the following cmd.
```
yarn pixeloven webpack start
```

To build an application as a deliverable bundle run the following.
```
yarn pixeloven webpack build
```
With either of the above cmds there are options that can help with all phases of the process. Some of these options are specific to the development server while others are added to help customize the underlying webpack configuration.

### General configuration options
| Name | Default | Description |
| --- | --- | --- |
| `--path` |  `/` | Public path an application will be mounted at. Generally the default value is recommended. |

### Webpack configuration options
| Name | Default | Description |
| --- | --- | --- |
| `--profile` |  `false` | Sets a flag for webpack to output "records" with profiling. |
| `--source-map` |  `false` | Sets a flag for webpack to include source mapping. |
| `--stats` |  `false` | Sets a flag for webpack to output "stats" for `webpack-bundle-analyzer`. |

### Development server configuration options
| Name | Default | Description |
| --- | --- | --- |
| `--host` |  `localhost` | Host development server will be running on. Generally the default value is recommended. |
| `--ignored` |  `/node_modules/` | Defines a pattern for ignoring paths for file watching. |
| `--path` |  `false` | Sets a flag for webpack to output "records" with profiling and stats. |
| `--poll` |  `500` | Set polling frequency. `false` signifies no polling. Generally the default value is recommended. |
| `--port` |  `8080` | Port to bind development server to. |
| `--protocol` |  `http` | Expected protocol for development server. |

> Note below are some recommendations based on learn A few notes for development. 
It is recommended to keep polling on for cross platform purposes. File watching can be CPU intensive if a system falls back to fs.watchFile versus utilizing file system events with fs.watch. This is often common on linux machines.