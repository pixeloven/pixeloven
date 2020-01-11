#
# This is our base node image. It contains all the tooling required to build and run our applications.
# This can also serve as a guide for dockerizing services made with PixelOven
#
FROM node:12.14
LABEL description="Node 10 image for PixelOven"
LABEL maintainer="Brian Gebel <brian@pixeloven.com>"

# Install system level locales
RUN apt-get update && \ 
    apt-get install -y locales && \
    apt-get clean all
RUN localedef -i en_US -f UTF-8 en_US.UTF-8

# Update tooling
RUN npm install -g npm && \
    npm install -g lerna && \ 
    npm install -g pm2 && \
    curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
