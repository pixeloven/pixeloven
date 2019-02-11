FROM node:10.15
LABEL description="React SSR Example"

# Install system level locales
RUN apt-get update && \ 
    apt-get install -y locales
RUN localedef -i en_US -f UTF-8 en_US.UTF-8 && \
    localedef -i en_GB -f UTF-8 en_GB.UTF-8 && \
    localedef -i es_ES -f UTF-8 es_ES.UTF-8 && \
    localedef -i fr_FR -f UTF-8 fr_FR.UTF-8 && \
    localedef -i it_IT -f UTF-8 it_IT.UTF-8 && \
    localedef -i de_DE -f UTF-8 de_DE.UTF-8 && \
    localedef -i nl_NL -f UTF-8 nl_NL.UTF-8 && \
    localedef -i pt_BR -f UTF-8 pt_BR.UTF-8

WORKDIR /tmp
COPY . /tmp/

# Build application
RUN npm install -g npm && \
    npm install -g yarn && \
    yarn install && \
    yarn run build

# Copy repo files into container and move node_modules into app and then build application
WORKDIR /usr/src/app
RUN cp -a /tmp/dist /usr/src/app/ && \
    cp -a /tmp/node_modules /usr/src/app/ && \
    cp -a /tmp/package.json /usr/src/app/

EXPOSE 48080
EXPOSE 9001
