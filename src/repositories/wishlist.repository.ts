import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Wishlist, WishlistRelations, WishlistDetail} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {WishlistDetailRepository} from './wishlist-detail.repository';

export class WishlistRepository extends DefaultCrudRepository<
  Wishlist,
  typeof Wishlist.prototype.id,
  WishlistRelations
> {

  public readonly wishlistDetails: HasManyRepositoryFactory<WishlistDetail, typeof Wishlist.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('WishlistDetailRepository') protected wishlistDetailRepositoryGetter: Getter<WishlistDetailRepository>,
  ) {
    super(Wishlist, dataSource);
    this.wishlistDetails = this.createHasManyRepositoryFactoryFor('wishlistDetails', wishlistDetailRepositoryGetter,);
    this.registerInclusionResolver('wishlistDetails', this.wishlistDetails.inclusionResolver);
  }
}
