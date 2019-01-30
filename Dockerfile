FROM node:10.15
LABEL description="PixelOven"

RUN apt-get update && \
    npm install -g npm && \
    npm install -g yarn && \
    npm install -g lerna

