#!/bin/bash
#https://gist.githubusercontent.com/davidbarral/6bba314cc4b9b6c51eb8c4c616d8be27/raw/044ab37607c03c391bf134f847313271b4678731/task
# Re-write this in TypeScript and compile
# Also need to use absolute pathing
# figure out how to use the local configs instead of cmd line

CMD=$1
shift

exe() { echo "$@" ; $@ ; }

case $CMD in
  "clean")
    exe "rimraf **/node_modules"
    ;;

  "compile")
    exe "../../node_modules/.bin/babel --config-file $(pwd)/babel.config.js --verbose -d ./lib ./src"
    ;;

  "compile:clean")
    exe "rimraf **/dist && rimraf **/docs"
    ;;

  "pretty")
    exe "prettier **/*.{ts,tsx} --write --trailing-comma all --tab-width 4"
    ;;

  "test")
    if [ -d "./test" ]; then
      exe "../../node_modules/.bin/jest -c $(pwd)/jest.config.js --rootDir ."
    else
      echo "No tests to run"
    fi
    ;;

  "test:clean")
    exe "rimraf **/coverage"
    ;;

  "lint")
    exe "tslint --project . -t codeFrame"
    ;;
    
  *)
    if [[ -z "$CMD" ]]; then
      echo "USAGE: ./task (clean|compile|test|lint|<node_modules_bin_command>) command_args"
      exit 0
    fi
    exe "../../node_modules/.bin/$CMD $@"
    ;;
esac