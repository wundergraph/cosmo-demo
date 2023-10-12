# Cosmo Demo

This demo consists of 2 subgraphs

- posts
- users

## Running Subgraphs

You can run each subgraph as shown below

```bash
cd subgraph-posts && npm run dev
```

## Running Router

You can run the router locally by executing the following command. make sure you have the graph api token.

```bash
cd router && docker run \
    --name cosmo-router \
    --env-file .env \
    -p 3001:3001 \
    ghcr.io/wundergraph/cosmo/router:latest
```

## CI/CD

GitHub actions are setup to do schema checks on pull requests and schema publish on push to main.
