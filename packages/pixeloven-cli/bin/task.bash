#!/bin/bash
#https://gist.githubusercontent.com/davidbarral/6bba314cc4b9b6c51eb8c4c616d8be27/raw/044ab37607c03c391bf134f847313271b4678731/task
# Re-write this in TypeScript and compile
# Also need to use absolute pathing
# figure out how to use the local configs instead of cmd line
# Need to be able to specific paths with linting and prettier
# Mack --colors configrable for CI
# TODO Compile --watch is needed
# Need to be able to pass args in...

# Declare configuration files
tsconfigrc="$(pwd)/tsconfig.json"
tslintrc="$(pwd)/tslint.json"
prettierrc="$(pwd)/prettierrc.json"
jestrc="$(pwd)/jestrc.json"
stylelintrc="$(pwd)/stylelintrc.json"

CMD=$1
shift

error() { echo -e "\e[31m$@"; exit 1; }

exe() { echo "$@" ; $@ ; }

case $CMD in
  "clean")
    exe "rimraf **/node_modules"
    ;;

  "compile:ts")
    if [ -f $tsconfigrc ]; then
      exe "tsc --pretty --project $tsconfigrc"
    else
      error "File not found $tsconfigrc"
    fi
    ;;

  "compile:clean")
    exe "rimraf **/dist && rimraf **/docs"
    ;;

  "lint:ts")
    if [ -f $tslintrc ]; then
      exe "tslint -t codeFrame --config $tslintrc --project ."
    else
      error "File not found $tslintrc"
    fi
    ;;

  "lint:scss")
    if [ -f $stylelintrc ]; then
      exe "stylelint src/**/*.scss --syntax scss --config $stylelintrc"
    else
      error "File not found $stylelintrc"
    fi
    ;;

  "pretty")
    if [ -f $prettierrc ]; then
      exe "prettier **/*.{ts,tsx} --write --trailing-comma all --tab-width 4 --config $prettierrc"
    else
      error "File not found $prettierrc"
    fi
    ;;

  "pretty:ts")
    if [ -f $tslintrc ]; then
      exe "tslint -t codeFrame --config $tslintrc --project . --fix"
    else
      error "File not found $tslintrc"
    fi
    ;;

  "pretty:scss")
    if [ -f $stylelintrc ]; then
      exe "stylelint src/**/*.scss --syntax scss --config $stylelintrc --fix"
    else
      error "File not found $stylelintrc"
    fi
    ;;

  "test")
    if [ -f $jestrc ]; then
      exe "jest --color --coverage --config $jestrc --env=jsdom"
    else
      error "File not found $jestrc"
    fi
    ;;

  "test:watch")
    if [ -f $jestrc ]; then
      exe "jest --watch --config $jestrc --env=jsdom"
    else
      error "File not found $jestrc"
    fi
    ;;

  "test:clean")
    exe "rimraf **/coverage"
    ;;
    
  *)
    if [[ -z "$CMD" ]]; then
      echo "USAGE: ./task (clean|compile|lint|pretty|test|<node_modules_bin_command>) command_args"
      exit 0
    fi
    exe "../node_modules/.bin/$CMD $@"
    ;;
esac