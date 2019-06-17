FROM node:10
LABEL description="React SSR Example"

WORKDIR /usr/src/app/
ADD . /usr/src/app/

# Install deps and build application
# @todo pm2 should be a depo of the main project and what about lerna
RUN apt-get update && \
    npm install -g npm && \
    npm install -g yarn && \ 
    npm install -g lerna && \ 
    npm install -g pm2

# Setup ENV for run time
ENV HOST "0.0.0.0"
ENV PORT "8080"
ENV PROTOCOL "http"
ENV PUBLIC_PATH "/"

# Build application
RUN yarn bootstrap && \
    yarn compile

# @todo Should make this more general for any number of apps and packages
WORKDIR /usr/src/app/examples/react-ssr-example

EXPOSE 8080
EXPOSE 9001

# @todo Need to document how to use these
# @todo Need to fix the file serving issues but otherwise it works