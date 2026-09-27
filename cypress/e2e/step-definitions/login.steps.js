import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { ids, el } from '../../support/selectors.js';

const exemplosBusca = {
  Nome: { termo: 'Luiza Garcia', coluna: 1, valor: 'Luiza Garcia' },
  Matrícula: { termo: '1013335', coluna: 0, valor: '1013335' },
};

function senhaDisponivel(callback) {
  cy.get(el(ids.senha)).then(($campo) => {
    if (!$campo.is(':disabled')) {
      callback($campo);
    }
  });
}

Given('que estou na tela de login da aplicação', () => {
  cy.get(el(ids.loginView)).should('not.have.class', 'hidden');
});

When('eu preencho o campo de matrícula com {string}', (matricula) => {
  if (matricula === 'dados inválidos') {
    cy.fixture('usuario').then(({ invalido }) => {
      cy.get(el(ids.matricula)).clear().type(invalido.matricula);
    });
    return;
  }
  if (matricula === 'dados em branco') {
    cy.get(el(ids.matricula)).clear();
    return;
  }
  cy.get(el(ids.matricula)).clear().type(matricula);
});

When('eu preencho o campo de senha com {string}', (senha) => {
  if (senha === 'dados inválidos') {
    cy.fixture('usuario').then(({ invalido }) => {
      senhaDisponivel(($campo) => cy.wrap($campo).clear().type(invalido.senha));
    });
    return;
  }
  if (senha === 'dados em branco') {
    senhaDisponivel(($campo) => cy.wrap($campo).clear());
    return;
  }
  senhaDisponivel(($campo) => cy.wrap($campo).clear().type(senha));
});

When('clico no botão de acessar', () => {
  cy.get(el(ids.loginSubmitBtn)).click();
});

Then('o sistema exibe uma mensagem de erro correspondente', () => {
  cy.get(el(ids.matricula))
    .invoke('val')
    .then((matricula) => {
      if (!matricula) {
        cy.get(el(ids.matriculaError)).should('contain', 'Informe a matrícula');
        return;
      }
      cy.get(el(ids.formFeedback)).should('contain', 'Ops! Algo de errado aconteceu');
    });
});

Then('permaneço na tela de login', () => {
  cy.get(el(ids.loginView)).should('not.have.class', 'hidden');
});

Then('sou redirecionado para a tela de listagem de alunos', () => {
  cy.get(el(ids.studentsView), { timeout: 10000 }).should('not.have.class', 'hidden');
  cy.get(el(ids.studentsTitle)).should('contain', 'Alunos');
});

Given('que sou usuário autenticado no sistema', () => {
  cy.loginComoUsuarioValido();
});

Given('que estou na tela de alunos', () => {
  cy.get(el(ids.studentsView)).should('not.have.class', 'hidden');
});

When('eu clico no botão de sair', () => {
  cy.get(el(ids.logoutButton)).click();
});

Then('o sistema encerra a minha sessão', () => {
  cy.window().its('localStorage.loggedIn').should('be.undefined');
});

Then('sou redirecionado para a tela de acesso à aplicação', () => {
  cy.get(el(ids.loginView)).should('not.have.class', 'hidden');
});

Then('o sistema exibe erro de validação no campo matrícula', () => {
  cy.get(el(ids.matriculaError)).should('contain', '7 e 9 dígitos');
});

Given('que sou usuário autenticado na tela de alunos', () => {
  cy.loginComoUsuarioValido();
});

When('preencho a busca com um dado válido referente ao {string}', (filtro) => {
  const criterio = exemplosBusca[filtro];
  cy.wrap(criterio).as('busca');
  cy.get(el(ids.studentSearch)).clear().type(criterio.termo);
});

Then('o sistema filtra a lista de alunos', () => {
  cy.get('@busca').then(({ coluna, valor }) => {
    cy.get(`${el(ids.studentsTableBody)} tr`).each(($linha) => {
      cy.wrap($linha).find('td').eq(coluna).should('contain', valor);
    });
  });
});

Then('exibe na tela apenas os registros correspondentes à busca', () => {
  cy.get('@busca').then(({ valor }) => {
    cy.get(el(ids.studentsTableBody)).should('contain', valor);
  });
});
