.PHONY: help install dev test build git-flow-init git-flow-feature-start git-flow-release-start git-flow-hotfix-start

help:
	@echo "Targets available:"
	@echo "  make install     - Install frontend dependencies"
	@echo "  make dev         - Start development server"
	@echo "  make test        - Run frontend tests"
	@echo "  make build       - Build frontend"
	@echo "  make git-flow-init               - Initialize Git Flow defaults"
	@echo "  make git-flow-feature-start NAME=feature-name"
	@echo "  make git-flow-release-start NAME=0.1.0"
	@echo "  make git-flow-hotfix-start NAME=0.1.1"

install:
	bun install

dev:
	bun run dev

test:
	bun run test

build:
	bun run build

git-flow-init:
	@command -v git-flow >/dev/null 2>&1 || (echo "git-flow not found. Install first (macOS: brew install git-flow-avh)" && exit 1)
	git flow init -d

git-flow-feature-start:
	@test -n "$(NAME)" || (echo "Use NAME=<feature-name>" && exit 1)
	git flow feature start $(NAME)

git-flow-release-start:
	@test -n "$(NAME)" || (echo "Use NAME=<version>" && exit 1)
	git flow release start $(NAME)

git-flow-hotfix-start:
	@test -n "$(NAME)" || (echo "Use NAME=<version>" && exit 1)
	git flow hotfix start $(NAME)