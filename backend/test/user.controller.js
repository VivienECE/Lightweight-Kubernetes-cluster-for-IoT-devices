const { expect } = require('chai')
const mesureController = require('../src/controllers/mesure')
const { dbsize } = require('../src/dbClient')

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
      
describe('mesure', () => {

  describe('Create', () => {
    before(() => {
      client = require('../src/dbClient')
      client.flushall();
    })

    it('create new mesures', (done) => {
      mesureController.create(mesure1, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
      })
      
      mesureController.create(mesure2, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong mesure parameters', (done) => {
      const mesure = {
        datetime: '000',
        pollution: '000'
      }
      mesureController.create(mesure, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing mesure', (done)=> {
      mesureController.create(mesure1, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })
  })


  describe('Get', ()=> {
    before(() => {
      client = require('../src/dbClient')
    })
   
      it('Get an mesure', (done) => {
      mesureController.get(mesure1.mesurename, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.include(mesure1)
          done()
       })
    })
    it('Get a mesure that doesn\'t exist', (done) => {
      const mesure = {
        datetime: '1617566300000',
        nom: 'Station 3',
        pollution: '300'
      }
      mesureController.get(mesure.mesurename, (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
    it('Get all mesures', (done) => {
      mesureController.getAll((err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.deep.include(mesure1,mesure2)
          done()
       })
    })
  })
  
  describe('Put', ()=> {
    before(() => {
      client = require('../src/dbClient')
    })
    
  // TODO Create test for the get method
  // 1. First, create a mesure to make this unit test independent from the others
  
      it('Modify an mesure', (done) => {
      const mesure = {
        datetime: '1617566400000',
        nom: 'Station 1',
        pollution: '299'
      }
      mesureController.put(mesure, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
       })
       
       mesureController.get(mesure.mesurename, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.include(mesure)
          done()
       })
    })
    
    it('Modify an mesure that doesn\'t exist', (done) => {
      const mesure = {
        datetime: '21023',
        nom: 'stt',
        pollution: 'ee'
      }
      mesureController.put(mesure, (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
  })
  
  describe('Delete', ()=> {
    before(() => {
      client = require('../src/dbClient')
    })
    
     after(() => {
      client.flushall();
    })

  // TODO Create test for the get method
  // 1. First, create a mesure to make this unit test independent from the others
  
      it('Delete an mesure', (done) => {
      mesureController.delete(mesure2.mesurename, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal(1)
       })
       
       mesureController.get(mesure2.mesurename, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.be.equal(null)
          done()
       })
    })
    
    it('Delete an mesure that doesn\'t exist', (done) => {
      mesureController.delete("mesure_doesn't_exist", (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
  })
})
