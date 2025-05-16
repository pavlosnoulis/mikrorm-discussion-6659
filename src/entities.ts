import {
    BaseEntity,
    UuidType,
    Opt,
    Entity,
    Property,
    PrimaryKey,
    OneToOne,
    ManyToOne,
    OneToMany,
    Index,
    Unique,
    Collection,
    QueryOrder
} from "@mikro-orm/postgresql";
import { ProductRelation } from "./productRelation";

@Entity({ tableName: "clients" })
export class Client extends BaseEntity {
    @PrimaryKey({ type: UuidType, defaultRaw: "gen_random_uuid()" })
    id!: Opt<string>;

    @Property({ length: 120 })
    name!: string;
}

@Entity({ tableName: "products" })
export class Product extends BaseEntity {
    @PrimaryKey({ type: UuidType, defaultRaw: "gen_random_uuid()" })
    id!: Opt<string>;

    @Property()
    title!: string;

    @ManyToOne({ entity: () => Client, deleteRule: "cascade", nullable: true })
    client?: Client;

    @OneToMany(() => ProductRelation, (relation: ProductRelation) => relation.product, {
        orphanRemoval: true,
        orderBy: { units: QueryOrder.DESC }
    })
    slaveRelations = new Collection<ProductRelation>(this);

    @OneToOne(() => ProductRelation, (relation: ProductRelation) => relation.relatedProduct, {
        nullable: true,
        orphanRemoval: true
    })
    masterRelation?: ProductRelation;
}

@Entity({ tableName: "clientproducts" })
@Unique({ properties: ["client", "product"] })
@Index({ properties: ["client"] })
export class ClientProduct extends BaseEntity {
    @PrimaryKey({ type: UuidType, defaultRaw: "gen_random_uuid()" })
    id!: Opt<string>;

    @ManyToOne({ entity: () => Product, deleteRule: "cascade" })
    product!: Product;

    @ManyToOne({ entity: () => Client, deleteRule: "cascade" })
    client!: Client;
}
