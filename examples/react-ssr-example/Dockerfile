FROM node:10.15
LABEL description="React SSR Example"

# Copy directory contents to tmp directory
WORKDIR /tmp
COPY . /tmp/

RUN apt-get update && \
    npm install -g npm && \
    npm install -g yarn && \
    yarn install && \
    yarn build

# Copy repo files into container and move node_modules into app and then build application
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/ && \
    cp -a /tmp/dist /usr/src/app/

EXPOSE 8080
EXPOSE 9001
