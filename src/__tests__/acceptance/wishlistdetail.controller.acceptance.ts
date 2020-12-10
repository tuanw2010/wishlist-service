import {Client, expect} from '@loopback/testlab';
import {WishlistServiceApplication} from '../..';
import {WishlistDetailRepository} from '../../repositories';
import {setupApplication} from './test-helper';

describe('Whistist Detail Controller', () => {
  let app: WishlistServiceApplication;
  let client: Client;
  let wishlistDetailRepository: WishlistDetailRepository
  let wishlistDetail = {
    productName: 'T-Shirt XL',
    productQty: 1,
    productId: 'T0001',
    wishlistId: '90097e50-3af2-11eb-811b-150ed7179a7a',
    createdAt: '2020-12-10T13:36:52.471Z',
    updatedAt: '2020-12-10T13:36:52.471Z'
  };

  beforeEach('setupApplication', async () => {
    ({app, client} = await setupApplication());
    wishlistDetailRepository = await app.getRepository(WishlistDetailRepository);
  });

  afterEach(async () => {
    wishlistDetailRepository.deleteAll();
    await app.stop();
  });

  it('should create wishlist detail successfully', async () => {
    await client
      .post('/wishlist-details')
      .set('Accept', 'application/json')
      .send(wishlistDetail)
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('productName');
        expect(res.body).to.have.property('productQty');
        expect(res.body).to.have.property('productId');
        expect(res.body).to.have.property('wishlistId');
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');
      })
  });

  it('should return list of wishlist detail', async () => {
    await wishlistDetailRepository.create(wishlistDetail)
    await client
      .get('/wishlist-details')
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('productName');
        expect(res.body[0]).to.have.property('productQty');
        expect(res.body[0]).to.have.property('productId');
        expect(res.body[0]).to.have.property('wishlistId');
        expect(res.body[0]).to.have.property('createdAt');
        expect(res.body[0]).to.have.property('updatedAt');
      })
  });
});
