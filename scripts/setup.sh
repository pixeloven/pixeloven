 #!/bin/bash

#################################################
# SETUP: Attempts to setup the enviroment with 
#           all the requirements needed for SSR.
#################################################

. $(pwd)/scripts/shared/logger.sh
. $(pwd)/scripts/shared/helpers.sh

#
# Constants
#
ARGS="$@";
SUPPORTED_NODE_VERSION="v10";
OUTPUT_STREAM_FILE="setup-output.log";
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S);

# 
# Catch exit codes and spit out generic response
#
catch() {
    if [ ! $? -eq 0 ]; then
        error "execution failed" "please review $OUTPUT_STREAM_FILE for more details.";
        exit 1;
    fi
}

#
# Check standard requirements for ssr
#
contains "$ARGS" "requirements"
if [ $? -eq 0 ]; then

    # Checking node verision
    info "node" "checking node version.";
    nodeVersion=$(node -v 2>&1);
    if [ ! $? -eq 0 ]; then
        error "missing dependency" "node must be installed to continue. Please review https://nodejs.org/ for more information";
        exit 1;
    fi
    contains "$nodeVersion" $SUPPORTED_NODE_VERSION
    if [ $? -eq 0 ]; then
        success "node" "supported $SUPPORTED_NODE_VERSION installed.";
    else
        warn "unsupported" "the version of node installed is not supported by this framework. It is recommended that node be upgraded to $SUPPORTED_NODE_VERSION.";
    fi

    # Upgrade npm
    info "npm" "updating/installing global npm version.";
    output=$(npm i -g npm 2>&1);
    capture "$output";
    catch;

    # Installing yarn
    info "npm" "updating/installing global yarn version.";
    npmOutput=$(npm i -g yarn 2>&1);
    capture "$output";
    catch;

    # Installing lerna
    info "npm" "updating/installing global lerna version.";
    output=$(npm i -g lerna 2>&1);
    capture "$output";
    catch;
    success "npm" "setup completed.";
fi

#
# Setup docker
#
contains "$ARGS" "docker"
if [ $? -eq 0 ]; then
    info "docker" "running docker-compose pull to retrieve latest images.";
    output=$(docker-compose pull 2>&1);
    capture "$output";
    catch;
    success "docker" "setup completed.";
fi

#################################################
# THE END
#################################################