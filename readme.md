# Tables, Documents, and Graphs

> Lets learn about DATABASES and what they are good at or bad at!

This repo is the backing code for the written essay that lives over at https://nikolas.ws/tables-documents-and-graphs/

## Getting Started

Each datastore has a directory at the root with a dockerfile for standing up the service.

### Elastic Search

```
docker network create tdg

docker run -d --name elasticsearch --net tdg -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:8.5.0
```