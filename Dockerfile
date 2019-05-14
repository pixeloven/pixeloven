FROM node:10
LABEL description="React SSR Example"

WORKDIR /usr/src/app/
ADD . /usr/src/app/

# Install deps and build application
RUN apt-get update && \
    npm install -g npm && \
    npm install -g yarn && \
    # npm install -g pm2 && \
    yarn install

# Setup ENV for run time
ENV BABEL_ENV "production"
ENV HOST "0.0.0.0"
ENV PORT "8080"
ENV PROTOCOL "http"
ENV PUBLIC_PATH "/example/"
ENV NODE_ENV "production"
ENV ENVIRONMENT "production"

# Build application
RUN yarn bootstrap

# @todo Figure out how to do persistant volumes with lerna
VOLUME /usr/src/app/node_modules

# @todo Need to remove this harcoded value
#   - Create a min Docker file for all examples
#   - Then extend it for each example
WORKDIR /usr/src/app/examples/react-ssr-example

EXPOSE 8080
EXPOSE 9001

