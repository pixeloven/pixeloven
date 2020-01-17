NAMESPACE=pixeloven
IMAGE_NAME=cli
IMAGE_TAG=latest

IMAGE=$(NAMESPACE)/$(IMAGE_NAME):$(IMAGE_TAG)
DOCKERFILE_PATH=./Dockerfile
CONTEXT_PATH=../../

build: 
	@echo "[+] Starting Docker build for ${IMAGE}"
	docker build --rm -t ${IMAGE} -f ${DOCKERFILE_PATH} ${CONTEXT_PATH}

test:
	@echo "[+] Running tests"
	docker run --rm ${IMAGE} node --version
	docker run --rm ${IMAGE} npm --version
	docker run --rm ${IMAGE} yarn --version
	docker run --rm ${IMAGE} lerna --version
	docker run --rm ${IMAGE} pm2 --version

clean:
	@echo "[+] Cleaning..."
	-docker rmi -f ${IMAGE}

.PHONY: build test clean

