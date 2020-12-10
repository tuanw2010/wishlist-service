import {Client, expect} from '@loopback/testlab';
import {WishlistServiceApplication} from '../..';
import {WishlistRepository} from '../../repositories';
import {setupApplication} from './test-helper';

describe('Whistist Controller', () => {
  let app: WishlistServiceApplication;
  let client: Client;
  let wishlistRepository: WishlistRepository;
  let wishlist = {
    name: 'My wishlist',
    customerId: '10001',
    createdAt: '2020-12-10T13:24:15.204Z',
    updatedAt: '2020-12-10T13:24:15.204Z'
  };

  beforeEach('setupApplication', async () => {
    ({app, client} = await setupApplication());
    wishlistRepository = await app.getRepository(WishlistRepository);
  });

  afterEach(async () => {
    wishlistRepository.deleteAll();
    await app.stop();
  });

  it('should create wishlist successfully', async () => {
    await client
      .post('/wishlists')
      .set('Accept', 'application/json')
      .send(wishlist)
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('customerId');
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');
      })
  });

  it('should return list of wishlist', async () => {
    await wishlistRepository.create(wishlist)
    await client
      .get('/wishlists')
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('customerId');
        expect(res.body[0]).to.have.property('createdAt');
        expect(res.body[0]).to.have.property('updatedAt');
      })
  });
});
