# @pixeloven/cli

> Pixel Oven cli

See our website [PixelOven](https://www.pixeloven.com/) for more information or our [issues](https://github.com/pixeloven/pixeloven/issues) board to report issues associated with this package.

## Install

Using npm:

```sh
npm install --save-dev @pixeloven/cli
```

or using yarn:

```sh
yarn add --dev @pixeloven/cli
```

## Commands

Copy

`pixeloven copy <source> <dest[optional]> <globPattern[optional]>` There are three args source (required) dest (optional defaulting to relative /dist/lib directory) and globPattern (defaulting to match all). All paths and patterns are relative to where the command is invoked.

`pixeloven copy <source>` if source matches one of the following args:
- `ico`
- `scss`
- `svg`
- `assets`
all files in all subdirectories local to where the command is run that have the file path extention of those args will be copied to a default `./disb/lib` directory. If the source provided is of an existing directory or file path, `copy` will attempt to copy all *contents* of the provided source path to a default `./dist/lib` directory. 
Examples:
```sh
$ pixeloven copy ico
Successfully copied ico files to dist

$ pixeloven copy /work/dir
Successfully copied contents of /work/dir to dist/lib
```

`pixeloven copy <source> <dest>` if source is not of the args from above, `copy` will attempt to copy all contents of source to the provided dest path/file.
Examples:
```sh
$ pixeloven copy /work/dir/file.txt /dist/lib/custom/dir/file.txt
Successfully copied contents of /work/dir/file.txt to /dist/lib/custom/dir/file.txt

$ pixeloven copy /work/dir/file.txt /dist/lib/newfile.txt
Successfully copied contents of /work/dir/file.txt to /dist/lib/newfile.txt
```

`pixeloven copy <source> <dest> <globPattern>` if source is not of the args from above, `copy` will attempt to copy all contents of source to the provided dest path where contents match the provided glob pattern. (For more about glob patterns, see [here](https://github.com/szwacz/fs-jetpack#matching-patterns).)
Examples:
```sh
$ pixelove copy /work/dir /dist/lib **.tsx
Successfully copied contents of /work/dir to /dist/lib matching **.tsx
```



