#!/bin/bash

#
# This script can come in handy when lerna fails to publish but tags the repo anyway. 
# If this happens the versions in NPM and git can be mismatched. 
# Often times we want to reset any commits made by lerna and remove the tag.
#

# delete local tag '12345'
git tag -d $1
# delete remote tag '12345' (eg, GitHub version too)
git push origin :refs/tags/$1

# alternative approach
# git push --delete origin tagName
# git tag -d tagName