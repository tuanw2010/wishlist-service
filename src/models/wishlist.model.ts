import {Entity, model, property, hasMany} from '@loopback/repository';
import {WishlistDetail, WishlistDetailWithRelations} from './wishlist-detail.model';

@model({})
export class Wishlist extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'customer_id'
    }
  })
  customerId: string;

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

  @hasMany(() => WishlistDetail, {keyTo: 'wishlistId'})
  wishlistDetails: WishlistDetail[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Wishlist>) {
    super(data);
  }
}

export interface WishlistRelations {
  wishlistDetails?: WishlistDetailWithRelations[]
}

export type WishlistWithRelations = Wishlist & WishlistRelations;
