import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {WishlistDetail} from '../models';
import {WishlistDetailRepository} from '../repositories';

export class WishlistdetailController {
  constructor(
    @repository(WishlistDetailRepository)
    public wishlistDetailRepository : WishlistDetailRepository,
  ) {}

  @post('/wishlist-details', {
    responses: {
      '200': {
        description: 'WishlistDetail model instance',
        content: {'application/json': {schema: getModelSchemaRef(WishlistDetail)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WishlistDetail, {
            title: 'NewWishlistDetail',
            exclude: ['id'],
          }),
        },
      },
    })
    wishlistDetail: Omit<WishlistDetail, 'id'>,
  ): Promise<WishlistDetail> {
    return this.wishlistDetailRepository.create(wishlistDetail);
  }

  @get('/wishlist-details/count', {
    responses: {
      '200': {
        description: 'WishlistDetail model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(WishlistDetail) where?: Where<WishlistDetail>,
  ): Promise<Count> {
    return this.wishlistDetailRepository.count(where);
  }

  @get('/wishlist-details', {
    responses: {
      '200': {
        description: 'Array of WishlistDetail model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(WishlistDetail, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(WishlistDetail) filter?: Filter<WishlistDetail>,
  ): Promise<WishlistDetail[]> {
    return this.wishlistDetailRepository.find(filter);
  }

  @patch('/wishlist-details', {
    responses: {
      '200': {
        description: 'WishlistDetail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WishlistDetail, {partial: true}),
        },
      },
    })
    wishlistDetail: WishlistDetail,
    @param.where(WishlistDetail) where?: Where<WishlistDetail>,
  ): Promise<Count> {
    return this.wishlistDetailRepository.updateAll(wishlistDetail, where);
  }

  @get('/wishlist-details/{id}', {
    responses: {
      '200': {
        description: 'WishlistDetail model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(WishlistDetail, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(WishlistDetail, {exclude: 'where'}) filter?: FilterExcludingWhere<WishlistDetail>
  ): Promise<WishlistDetail> {
    return this.wishlistDetailRepository.findById(id, filter);
  }

  @patch('/wishlist-details/{id}', {
    responses: {
      '204': {
        description: 'WishlistDetail PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WishlistDetail, {partial: true}),
        },
      },
    })
    wishlistDetail: WishlistDetail,
  ): Promise<void> {
    await this.wishlistDetailRepository.updateById(id, wishlistDetail);
  }

  @put('/wishlist-details/{id}', {
    responses: {
      '204': {
        description: 'WishlistDetail PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() wishlistDetail: WishlistDetail,
  ): Promise<void> {
    await this.wishlistDetailRepository.replaceById(id, wishlistDetail);
  }

  @del('/wishlist-details/{id}', {
    responses: {
      '204': {
        description: 'WishlistDetail DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.wishlistDetailRepository.deleteById(id);
  }
}
