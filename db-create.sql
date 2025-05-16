CREATE TABLE Clients (
  id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  name character varying(120) NOT NULL
);

CREATE TABLE Products (
  id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  title character varying(200) NOT NULL,
  client_id uuid NULL
);

CREATE TABLE ProductRelations (
  id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  product_id uuid NOT NULL,
  related_product_id uuid NOT NULL,
  units numeric(10,3) NOT NULL
);

CREATE TABLE ClientProducts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    product_id uuid NOT NULL,
    client_id uuid NOT NULL
);

ALTER TABLE ONLY ClientProducts
ADD CONSTRAINT "ClientProducts_client_id_product_id_unique" UNIQUE (client_id, product_id);

ALTER TABLE ONLY ClientProducts
ADD CONSTRAINT "ClientProducts_client_id_foreign"
FOREIGN KEY (client_id) REFERENCES Clients(id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY ClientProducts
ADD CONSTRAINT "ClientProducts_product_id_foreign" FOREIGN KEY (product_id)
REFERENCES Products(id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY ProductRelations
ADD CONSTRAINT "ProductRelations_product_id_related_product_id_unique"
UNIQUE (product_id, related_product_id);

ALTER TABLE ONLY ProductRelations
ADD CONSTRAINT "ProductRelations_related_product_id_unique"
UNIQUE (related_product_id);

ALTER TABLE ONLY ProductRelations
ADD CONSTRAINT "ProductRelations_product_id_foreign"
FOREIGN KEY (product_id) REFERENCES Products(id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY ProductRelations
ADD CONSTRAINT "ProductRelations_related_product_id_foreign"
FOREIGN KEY (related_product_id) REFERENCES Products(id)
ON UPDATE CASCADE ON DELETE CASCADE;
