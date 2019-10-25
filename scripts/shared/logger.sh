 #!/bin/bash

#
# Color Variables
#
C_RED="\e[31m";
C_GREEN="\e[32m"; # green
C_BLUE="\e[34m"; # blue
C_YELLOW="\e[93m"; # yellow
C_DIM="\e[2m" # dim color
C_END="\e[0m"; # No Color

#
# Level based logger
#
log() {
    LVL="$1";
    MSG="$2";
    shift 2;
    META=$@;
    echo "$LVL "${C_DIM}$MSG${C_END}" $META";
}

#
# Simple error echo function
#
error() {
    MSG="$1";
    shift
    log "${C_RED}error${C_END}" "$MSG" "$@";
}

#
# Simple error echo function
#
info() {
    MSG="$1";
    shift
    log "${C_BLUE}info${C_END}" "$MSG" "$@";
}

#
# Simple error echo function
#
success() {
    MSG="$1";
    shift
    log "${C_GREEN}success${C_END}" "$MSG" "$@";
}

#
# Simple error echo function
#
warn() {
    MSG=$1;
    shift
    log "${C_YELLOW}warn${C_END}" "$MSG" "$@";
}