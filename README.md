# About

This repository reproduces the issue mentioned in the mikro-orm discussion:

https://github.com/mikro-orm/mikro-orm/discussions/6659


To summary again the issue:

Given a dataset of items = { A, B, C }

A query that breaks the dataset in N pages should result in pages with UNIQUE
items.

However, it is the case as shown in this repository that some items are indeed
found in more than 1 page at the same time.

For example:

The 1st page among others includes: { A, ... }

The 2nd page among others ALSO includes: { A, ... }

Specifically you will find that these items are duplicated in the script:

`src/issue.ts`

```javascript
[
  {
    id: '7673561e-44c5-4e69-9488-08109b60e640',
    product: '513e7a86-55f8-457d-bd28-e95c4f6cbe64',
    client: 'c45cdb3d-bef4-4c0b-8841-0ab5f201c7e8'
  },
  {
    id: '91c34e39-51bc-4947-bcb7-ad79065136ad',
    product: 'e4f528ef-a2c1-4819-9217-de8a55736066',
    client: 'c45cdb3d-bef4-4c0b-8841-0ab5f201c7e8'
  },
  {
    id: '7d0309f5-e55d-4250-9aa0-68827ce25a5d',
    product: '06110c34-9104-4583-a0f8-847b55b4b9e2',
    client: 'c45cdb3d-bef4-4c0b-8841-0ab5f201c7e8'
  },
  {
    id: 'cda5d8e5-9c1c-4502-a563-c69f0b6fab4f',
    product: '65b1b2a4-bfc7-43f8-9571-68651f236a7f',
    client: 'c45cdb3d-bef4-4c0b-8841-0ab5f201c7e8'
  },
  {
    id: 'c0a6be3e-bd6a-4921-a59b-c5b611dee7ae',
    product: '09036b3b-a52c-4c81-ac17-c38b43074032',
    client: 'c45cdb3d-bef4-4c0b-8841-0ab5f201c7e8'
  },
  {
    id: '84cf101f-d101-4577-b77f-70cca8cc999e',
    product: 'fa041318-c85c-44e9-9f78-088ebd91fc24',
    client: 'c45cdb3d-bef4-4c0b-8841-0ab5f201c7e8'
  }
]

```


# Usage

Docker has been used so that the postgres database is seeded with the data

necessary to reproduce the issue.


```sh

# Node version: 22.14.0
# Npm version: 10.9.2
# Docker version: Docker version 28.0.4, build b8034c0
# @mikro-orm/core version: 6.4.15
# @mikro-orm/postgresql: 6.4.15
docker-compose up -d
npm install
npm run build
node ./dist/issue.js
```
