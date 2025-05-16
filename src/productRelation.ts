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
import { Product } from "./entities";

@Entity({ tableName: "productrelations" })
@Unique({ properties: ["product", "relatedProduct"] })
export class ProductRelation extends BaseEntity {
    @PrimaryKey({ type: UuidType, defaultRaw: "gen_random_uuid()" })
    id!: Opt<string>;

    @ManyToOne({ entity: () => Product, deleteRule: "cascade" })
    product!: Product;

    @OneToOne({ entity: () => Product, owner: true, deleteRule: "cascade" })
    relatedProduct!: Product;

    @Property({ columnType: 'numeric' })
    units!: number;
}
