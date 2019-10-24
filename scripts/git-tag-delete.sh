#!/bin/bash

# delete local tag '12345'
git tag -d $1
# delete remote tag '12345' (eg, GitHub version too)
git push origin :refs/tags/$1
# alternative approach
# git push --delete origin tagName
# git tag -d tagName