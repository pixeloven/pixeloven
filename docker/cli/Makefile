NAMESPACE=pixeloven
IMAGE_NAME=cli
IMAGE_TAG=latest

IMAGE=$(NAMESPACE)/$(IMAGE_NAME):$(IMAGE_TAG)
DOCKERFILE_PATH=./Dockerfile
CONTAINER=pixeloven
CONTEXT_PATH=../../

#
# Build docker image
#
build:
	@echo "[+] Starting Docker build for ${IMAGE_NAME}"
	docker build --rm -t ${IMAGE} -f ${DOCKERFILE_PATH} ${CONTEXT_PATH}

#
# Verify image
#
verify:
	@echo "[+] Verifying image"
	docker run --rm $(IMAGE) node --version
	docker run --rm $(IMAGE) npm --version
	docker run --rm $(IMAGE) yarn --version
	docker run --rm $(IMAGE) lerna --version
	docker run --rm $(IMAGE) pm2 --version

#
# Clean up docker artifacts
#
clean:
	# @echo "[+] Reset Repository..."
	# git clean -dfX
	@echo "[+] Cleaning up container..."
	docker rm -f $(CONTAINER)
	@echo "[+] Cleaning up images..."
	docker rmi -f $(IMAGE)

#
# Create container from image
#
create:
	docker create --name $(CONTAINER) -t ${IMAGE}

start:
	docker start $(CONTAINER)

.PHONY: build test clean

