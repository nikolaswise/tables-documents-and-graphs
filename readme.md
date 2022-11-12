# Tables, Documents, and Graphs

> Lets learn about DATABASES and what they are good at or bad at!

This repo is the backing code for the written essay that lives over at https://nikolas.ws/tables-documents-and-graphs/

## Getting Started

Each datastore has a directory at the root with a dockerfile for standing up the service.

### Elastic Search

https://www.elastic.co/guide/en/elasticsearch/reference/current/run-elasticsearch-locally.html

I set up elastic search locally, than paired it with Kibana in order to access to the console and use their DSL. Its fuckin … fine I guess.

Things I want to call out here that strike me as weird:

1. a query for match all documents in an index collection is _slow_. It took 1s to return _two tiny objects_. That's intersting and weird. How else does one list all the things? I don't think one _does_ because ES is fucking _search engine_ not a datastore.
2. join fields are complicated – they can only exist inside an index, there is no cross-index joining. this means that if you have disparate _kinds_ of things but those things are related to each other you either must stuff them all into a single index (weird) or replicate all the join logic yourself in your app with foreign key type structure. Thats … too bad.
3. The join relationships are managed _on the index on the datastore_ itself, which means creating new fields that are relationships _necessitates_ datastore administration and and index update. Whats something all devs love? Running commands directly against their production database. Cool.
4. Whats more, ElasticSearch is focused on _single level_ joing. They themselves say "We don’t recommend using multiple levels of relations to replicate a relational model." because "Each level of relation adds an overhead at query time in terms of memory and computation." Their plan is to _denormalize_ your data, which basically means handing all that management of relationships to your business logic, and requiring writing quite a lot of database interaction code to get that relationship structure. Which is something you need anyway if you use more than one index. Sheesh.
5. You cant make a partial document update. It blows away the entire doc every time. That means if you have a wide doc, but are only dealing with a single key:val pair, you need to fetch the entire wide doc, merge those JSON structures, then POST the whole damn thing up.
6. Same with the index I guess??? Shit
7. Joins are suuuuper fucking restrictive. They basically dont exist – each index can have ONE join mapping. They ONLY can be a one-to-one one-to-many relationhip. This means that an arbitrary number of many-to-many relationships dont exist. Thats cool. Thats helpful. And only one! WHat the fuck! This means that ES will only store denormalized indexes where relationship management is _entirely_ at the burden of the application and there is _no_ native query methods to traverse these relationships.

