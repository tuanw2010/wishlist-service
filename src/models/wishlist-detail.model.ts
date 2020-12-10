import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Wishlist, WishlistWithRelations} from './wishlist.model';

@model({})
export class WishlistDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid'
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'product_name'
    }
  })
  productName: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'product_qty'
    }
  })
  productQty: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'product_id'
    }
  })
  productId: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'created_at'
    }
  })
  createdAt?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'updated_at'
    }
  })
  updatedAt?: string;

  @belongsTo(() => Wishlist)
  wishlistId: string;

  constructor(data?: Partial<WishlistDetail>) {
    super(data);
  }
}

export interface WishlistDetailRelations {
  wishlist?: WishlistWithRelations
}

export type WishlistDetailWithRelations = WishlistDetail & WishlistDetailRelations;
