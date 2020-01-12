#!/bin/bash

#
# This file can be used to generate the docker-compose.volumes.yml
# which it's contents can then be copied to the top of
# docker-compose.override.yml
#
# @todo Make this able to push to the top of the override automatically
#
twoSpaces="  ";
fourSpaces="$twoSpaces$twoSpaces";
outputFile="docker-compose.volumes.yml";
outputBuffer="";

volumeMapping () {
  echo -e "${fourSpaces}- ./$1:/usr/src/app/$1:cached"
}

# Start output buffer
outputBuffer="version: '3'\nx-shared-volumes: &shared-volumes\n";
outputBuffer="${outputBuffer}${twoSpaces}volumes:\n";

# Append packages
files=$(ls -d -1 packages/pixeloven/*/src |
    while read line; do
        volumeMapping $line
    done
    );

outputBuffer="${outputBuffer}${files}\n";

# Append packages
files=$(ls -d -1 packages/pixeloven-*/*/src |
    while read line; do
        volumeMapping $line
    done
    );

outputBuffer="${outputBuffer}${files}\n";

# Re-write override file and copy services in
printf "$outputBuffer\n" > $outputFile;

