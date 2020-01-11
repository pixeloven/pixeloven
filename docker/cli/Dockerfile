
FROM pixeloven/node:12
LABEL description="Dockerized Version of the PixelOven CLI"
LABEL maintainer="Brian Gebel <brian@pixeloven.com>"

WORKDIR /usr/src/app/

ADD ./apps . 
ADD ./packages .
ADD ./codecov.yml .
ADD ./commitlint.config.js .
ADD ./lerna.json .
ADD ./package.json .
ADD ./yarn.lock .

RUN yarn all:bootstrap