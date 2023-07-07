# Quick Setup

### Add files that can live in the project repository - configure for project

1. package.json
2. cypress.config.js

### Add to build hook in .platform.app.yaml

```
hooks:

    build: |
        set -e

        DIR="vendor/ubc-web-services/cypress-drupal-10-e2e/cypress"
        if [ -d "$DIR" ]; then
            ln -s vendor/ubc-web-services/cypress-drupal-10-e2e/cypress cypress
        fi
```

### Add ubc-web-services/cypress-drupal-10-e2e

```
composer require ubc-web-services/cypress-drupal-10-e2e

platform build
```

### Run it
```
npm install
npm run cypress:open
```


