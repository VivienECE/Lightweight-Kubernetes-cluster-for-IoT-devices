const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

let client
const mesure1 = {
	datetime: 1617566400000,
	nom: 'station 1',
	pollution: '1000',
}

const mesure2 = {
	datetime: 1612566400000,
	nom: 'station 2',
	pollution: '32',
}
     
describe('mesure REST API', () => {

  before(() => {
    client = require('../src/dbClient')
  })
  
  after(()=> {
    app.close()
    client.quit()
  })

  describe('POST /mesure', () => {

    it('create new mesures', (done) => {
     
      chai.request(app)
        .post('/mesure')
        .send(mesure1)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
        })
      chai.request(app)
        .post('/mesure')
        .send(mesure2)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const mesure = {
        nom: 'zez',
        pollution: '000'
      }
      chai.request(app)
        .post('/mesure')
        .send(mesure)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  describe('GET /mesure', ()=> {
    it('get a new mesure', (done) => {
      chai.request(app)
        .get('/mesure/1612566400000')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.include(mesure1)
          done()
        })
        .catch((err) => {
           throw err
        })
    })
     it('get all mesures', (done) => {
      chai.request(app)
        .get('/mesure/')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.deep.include(mesure1,mesure2)
          done()
        })
        .catch((err) => {
           throw err
        })
     })
   })
   
 describe('PUT /mesure', () => {

    it('modify one mesure', (done) => {
    const mesure = {
       datetime: '1612566430000',
       nom: 'Station 10',
       pollution: '3000'
     }
     
      chai.request(app)
        .put('/mesure/1612566430000')
        .send(mesure)
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const mesure = {
        datetime: '1612566430001',
        nom: 'z',
        pollution: '000'
      }
      chai.request(app)
        .put('/mesure/1612566430001')
        .send(mesure)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })
  
  describe('DELETE /mesure', () => {

    it('delete one mesure', (done) => {
      chai.request(app)
        .delete('/mesure/1612566430000')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res.body.msg).to.be.equal(1)
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('delete a non-existent mesure', (done) => {
      const mesure = {
        datetime: '1612566430002',
        nom: 'S',
        pollution: 'S'
      }
      chai.request(app)
        .delete('/mesure/1612566430002')
        .send(mesure)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })
})
