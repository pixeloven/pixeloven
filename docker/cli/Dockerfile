
FROM pixeloven/node:12
LABEL description="Dockerized Version of the PixelOven CLI"
LABEL maintainer="Brian Gebel <brian@pixeloven.com>"

WORKDIR /usr/src/app/
RUN git clone https://github.com/pixeloven/pixeloven.git
WORKDIR /usr/src/app/pixeloven

RUN lerna bootstrap