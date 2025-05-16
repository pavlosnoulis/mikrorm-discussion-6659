import { Entity, MikroORM, PrimaryKey, Property, serialize } from "@mikro-orm/postgresql";
import { Client, Product, ClientProduct } from './entities';
import { ProductRelation } from "./productRelation";
import assert from 'node:assert';

const CLIENT_ID = "c45cdb3d-bef4-4c0b-8841-0ab5f201c7e8";

(async () => {
    const connection = await MikroORM.init({
        host: "localhost",
        port: 5432,
        dbName: "testdb",
        debug: true,
        entities: [Client, Product, ClientProduct, ProductRelation]
    });

    const em = connection.em.fork();
    const clients = await em.find(Client, {});

    const page1 = await em.find(
        ClientProduct,
        { client: { id: CLIENT_ID } },
        {
            limit: 1000,
            offset: 0,
            populate: ["product.masterRelation", "product.slaveRelations"],
        }
    );
    const page2 = await em.find(
        ClientProduct,
        { client: { id: CLIENT_ID } },
        {
            limit: 1000,
            offset: 1000,
            populate: ["product.masterRelation", "product.slaveRelations"],
        }
    );

    console.log(`page1: ${page1.length}`)
    console.log(`page2: ${page2.length}`)

    const duplicates = serialize(findDuplicates(page1, page2));

    assert(page1.find(cb('7673561e-44c5-4e69-9488-08109b60e640')));
    assert(page1.find(cb('91c34e39-51bc-4947-bcb7-ad79065136ad')));
    assert(page1.find(cb('7d0309f5-e55d-4250-9aa0-68827ce25a5d')));
    assert(page1.find(cb('cda5d8e5-9c1c-4502-a563-c69f0b6fab4f')));
    assert(page1.find(cb('c0a6be3e-bd6a-4921-a59b-c5b611dee7ae')));
    assert(page1.find(cb('84cf101f-d101-4577-b77f-70cca8cc999e')));

    assert(page2.find(cb('7673561e-44c5-4e69-9488-08109b60e640')));
    assert(page2.find(cb('91c34e39-51bc-4947-bcb7-ad79065136ad')));
    assert(page2.find(cb('7d0309f5-e55d-4250-9aa0-68827ce25a5d')));
    assert(page2.find(cb('cda5d8e5-9c1c-4502-a563-c69f0b6fab4f')));
    assert(page2.find(cb('c0a6be3e-bd6a-4921-a59b-c5b611dee7ae')));
    assert(page2.find(cb('84cf101f-d101-4577-b77f-70cca8cc999e')));

    console.log(`Number of duplicates: ${duplicates.length}`)

    await connection.close();
})();


function cb(id) {
    return (clientProduct) => clientProduct.id === id;
}

function findDuplicates(arr1: any, arr2: any) {
    const set1 = new Set(arr1);
    const duplicates = arr2.filter(item => set1.has(item));
    return [...new Set(duplicates)]; // remove any duplicates in the result itself
}
