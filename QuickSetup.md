# Quick Setup

### Add files that can live in the project repository - configure for project

1. package.json
2. cypress.config.js

### Add to build hook in .platform.app.yaml

```
hooks:

    build: |
        set -e

        DIR="vendor/ubc-web-services/Cypress-Drupal-10-E2E/cypress"
        if [ -d "$DIR" ]; then
            ln -s vendor/ubc-web-services/Cypress-Drupal-10-E2E/cypress cypress
        fi
```

### Add ubc-web-services/Cypress-Drupal-10-E2E

```
composer require ubc-web-services/Cypress-Drupal-10-E2E

platform build
```

### Run it
```
npm install
npm run cypress:open
```


