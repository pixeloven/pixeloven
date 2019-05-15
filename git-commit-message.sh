#!/bin/bash

#
# Runs Commit Citizen except on the specificed branches
#

# This way you can customize which branches should be skipped
if [ -z "$BRANCHES_TO_SKIP" ]; then
  BRANCHES_TO_SKIP=(master develop)
fi

# Get branch name and description
BRANCH_NAME=$(git branch | grep '*' | sed 's/* //')

# Branch name should be excluded using CZ
BRANCH_EXCLUDED=$(printf "%s\n" "${BRANCHES_TO_SKIP[@]}" | grep -c "^$BRANCH_NAME$")

if [ -n "$BRANCH_NAME" ] && ! [[ $BRANCH_EXCLUDED -eq 1 ]]; then 
  exec < /dev/tty && yarn commit --hook
fi
