FROM node:10.14
LABEL description="React SSR"

# Install CI tools, upgrade package managers and install modules
# Install tools for watching files: https://stackoverflow.com/questions/42445288/enabling-webpack-hot-reload-in-a-docker-application
# TODO add curl -fLSs https://circle.ci/cli | bash && \ once they support 2.1
WORKDIR /tmp
COPY package.json /tmp/

RUN apt-get update && \
    npm install -g npm && \
    npm install -g yarn && \
    yarn install

# Copy repo files into container and move node_modules into app and then build application
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/ && \
    yarn run build

EXPOSE 8080
EXPOSE 9001
