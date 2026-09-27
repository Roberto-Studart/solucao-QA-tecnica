import { ids, el } from './selectors.js';

Cypress.Commands.add('resetApplicationState', () => {
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.clear();
    },
  });
});

Cypress.Commands.add('loginComCredenciais', (matricula, senha) => {
  cy.get(el(ids.matricula)).clear().type(matricula);
  cy.get(el(ids.senha)).should('not.be.disabled').clear().type(senha);
  cy.get(el(ids.loginSubmitBtn)).click();
});

Cypress.Commands.add('loginComoUsuarioValido', () => {
  cy.fixture('usuario').then(({ valido }) => {
    cy.loginComCredenciais(valido.matricula, valido.senha);
    cy.get(el(ids.studentsView), { timeout: 10000 }).should('not.have.class', 'hidden');
  });
});

Cypress.Commands.add('buscarAlunoNaLista', (texto) => {
  cy.get(el(ids.studentSearch)).clear().type(String(texto));
  cy.get(el(ids.studentsTableBody)).should('not.contain', 'Nenhum aluno encontrado.');
});
