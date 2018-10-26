const expect = require('chai').expect;
const { syncAndSeed } = require('../db');
const { User } = require('../db');
const app = require('supertest')(require('../app'));
const jwt = require('jwt-simple');


describe('authentication', ()=> {

  beforeEach(()=> syncAndSeed());

  it('a valid user can authenticate', ()=> {
    return app.post('/api/auth')
      .send({ email: 'moe@moe.com', password: 'MOE' }) // client sends request via login form
      .expect(200) // User exists
      .then(res => {
        const token = res.body.token; // JWT has encoded a token and sent it back to user
        expect(token).to.be.ok;
        return app.get('/api/auth')
          .set('authorization', token) // sets token we received onto the header when making GET request
          .expect(200);
      })
      .then(res => {
        expect(res.body.email).to.equal('moe@moe.com');
      })
  });

  it('an invalid user cannot authenticate', ()=> {
    return app.post('/api/auth')
      .send({ email: 'moe@moe.com', password: 'WRONGPASSWORD' })
      .expect(401);
  });

  it('a valid user with a token encoded with the wrong JWT_SECRET cannot authenticate', ()=> {
    return app.post('/api/auth')
      .send({ email: 'moe@moe.com', password: 'MOE' })
      .expect(200)
      .then(res => {
        const moe = User.findOne({ where: { email: 'moe@moe.com' }});
        const badToken = jwt.encode({ id: moe.id }, 'wrongSecret');
        return app.get('/api/auth')
          .set('authorization', badToken)
          .expect(401);
      })
  });

  it('a token encoded with a wrong user id cannot authenticate', ()=> {
    const badToken = jwt.encode({ id: 123454321 } , process.env.JWT_SECRET); //this test assume numeric user id's. will need to change if using UUID strings.
    return app.get('/api/auth')
      .set('authorization', badToken)
      .expect(401);
  });

});