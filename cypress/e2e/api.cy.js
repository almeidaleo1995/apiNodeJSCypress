// cypress/integration/api.spec.js

describe('API Test', () => {
    it('Should retrieve questions from the API', () => {
      cy.request('GET', 'http://localhost:3000/questions')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.a('array');
        });
    });
  });
  