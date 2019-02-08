#!/bin/bash

# Declare configuration files
tsconfigConfigPath="$(pwd)/tsconfig.json"
tslintConfigPath="$(pwd)/tslint.json"
prettierConfigPath="$(pwd)/prettier.json"
jestConfigPath="$(pwd)/jest.json"
stylelintConfigPath="$(pwd)/stylelint.json"
typedocConfigPath="$(pwd)/typedoc.json"

CMD=$1
shift

error() { 
  echo -e "\e[31m$@"; exit 1; 
}

exe() { 
  echo "$@" ; $@ ; 
}

case $CMD in
    "clean")
        exe "rimraf **/node_modules"
    ;;
    "compile:clean")
        exe "rimraf dist"
    ;;
    "compile:ts")
        if [ -f $tsconfigConfigPath ]; then
            exe "tsc --pretty --project $tsconfigConfigPath $@"
        else
            error "File not found $tsconfigConfigPath"
        fi
    ;;
    "document:clean")
        exe "rimraf docs"
    ;;
    "document:ts")
        if [ -f $typedocConfigPath ]; then
            if [ -f $tsconfigConfigPath ]; then
                exe "typedoc --options $typedocConfigPath --tsconfig $tsconfigConfigPath $@"
            else
                error "File not found $tsconfigConfigPath"
            fi
        else
            error "File not found $typedocConfigPath"
        fi
    ;;
    "lint:ts")
        if [ -f $tslintConfigPath ]; then
            exe "tslint -t codeFrame --config $tslintConfigPath $@"
        else
            error "File not found $tslintConfigPath"
        fi
    ;;
    "lint:scss")
        if [ -f $stylelintConfigPath ]; then
            exe "stylelint --syntax scss --config $stylelintConfigPath $@" # src/**/*.scss
        else
            error "File not found $stylelintConfigPath"
        fi
    ;;
    "pretty")
        if [ -f $prettierConfigPath ]; then
            exe "prettier --write --config $prettierConfigPath $@" # src/**/*.{scss,ts,tsx}
        else
            error "File not found $prettierConfigPath"
        fi
    ;;
    "pretty:ts")
        if [ -f $tslintConfigPath ]; then
            exe "tslint -t codeFrame --config $tslintConfigPath --fix $@" # src/**/*.{ts,tsx}
        else
            error "File not found $tslintConfigPath"
        fi
    ;;
    "pretty:scss")
        if [ -f $stylelintConfigPath ]; then
            exe "stylelint --syntax scss --config $stylelintConfigPath --fix $@" # src/**/*.scss
        else
            error "File not found $stylelintConfigPath"
        fi
    ;;
    "test")
        if [ -f $jestrc ]; then
            exe "jest --maxWorkers 2 --config $jestrc --env=jsdom $@"
        else
            error "File not found $jestrc"
        fi
    ;;
    "test:clean")
        exe "rimraf coverage"
    ;;
    "test:watch")
        if [ -f $jestConfigPath ]; then
            exe "jest --watch --config $jestConfigPath --env=jsdom $@"
        else
            error "File not found $jestConfigPath"
        fi
    ;;
*)
# Fallback if not defined above
if [[ -z "$CMD" ]]; then
    echo "USAGE: ./task (clean|compile|document|lint|pretty|test)"
    exit 0
fi
    error "Command not found $CMD"
;;
esac
