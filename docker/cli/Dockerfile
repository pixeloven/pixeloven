
FROM pixeloven/node:12
LABEL description="Dockerized Version of the PixelOven CLI"
LABEL maintainer="Brian Gebel <brian@pixeloven.com>"

WORKDIR /usr/src/app/

ADD . .

RUN lerna bootstrap && \
    lerna run compile && \
    lerna link