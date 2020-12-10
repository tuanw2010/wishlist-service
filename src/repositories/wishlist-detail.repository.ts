import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {WishlistDetail, WishlistDetailRelations, Wishlist} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {WishlistRepository} from './wishlist.repository';

export class WishlistDetailRepository extends DefaultCrudRepository<
  WishlistDetail,
  typeof WishlistDetail.prototype.id,
  WishlistDetailRelations
> {

  public readonly wishlist: BelongsToAccessor<Wishlist, typeof WishlistDetail.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('WishlistRepository') protected wishlistRepositoryGetter: Getter<WishlistRepository>,
  ) {
    super(WishlistDetail, dataSource);
    this.wishlist = this.createBelongsToAccessorFor('wishlist', wishlistRepositoryGetter,);
    this.registerInclusionResolver('wishlist', this.wishlist.inclusionResolver);
  }
}
