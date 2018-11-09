#!/bin/bash
#https://gist.githubusercontent.com/davidbarral/6bba314cc4b9b6c51eb8c4c616d8be27/raw/044ab37607c03c391bf134f847313271b4678731/task
# Re-write this in TypeScript and compile
# Also need to use absolute pathing
CMD=$1
shift

exe() { echo "$@" ; $@ ; }

case $CMD in
  clean)
    exe "rm -fr ./lib"
    ;;
    
  compile)
    exe "../../node_modules/.bin/babel --config-file $(pwd)/babel.config.js --verbose -d ./lib ./src"
    ;;
    
  pretty)
    exe "prettier **/*.{ts,tsx} --write"
    ;;

  test)
    if [ -d "./test" ]; then
      exe "../../node_modules/.bin/jest -c $(pwd)/jest.config.js --rootDir ."
    else
      echo "No tests to run"
    fi
    ;;
    
  lint)
    exe "../../node_modules/.bin/eslint ./src ./test -c $(pwd)/eslint.config.js --report-unused-disable-directives"
    ;;
    
  *)
    if [[ -z "$CMD" ]]; then
      echo "USAGE: ./task (clean|compile|test|lint|<node_modules_bin_command>) command_args"
      exit 0
    fi
    exe "../../node_modules/.bin/$CMD $@"
    ;;
esac