NAMESPACE=pixeloven
IMAGE_NAME=node
IMAGE_TAG=14

IMAGE=$(NAMESPACE)/$(IMAGE_NAME):$(IMAGE_TAG)

build: 
	@echo "[+] Starting Docker build for ${IMAGE}"
	docker build --rm \
	-t ${IMAGE} .

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
