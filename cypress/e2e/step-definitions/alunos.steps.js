import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { ids, el, btnAcao } from '../../support/selectors.js';

// alguns alunos fixos do mock (mockDatabase.js do site)
const jose = '1010510';
const felipe = '1010546';

let dadosNovoAluno;
let nomeEditado;

When('eu clico na opção para cadastrar um novo aluno', () => {
  cy.get(el(ids.addStudentButton)).click();
  cy.get(el(ids.registrationPanel)).should('not.have.class', 'hidden');
});

When('preencho os campos obrigatórios do formulário com dados válidos', () => {
  const sufixo = Date.now().toString().slice(-6);
  dadosNovoAluno = {
    matricula: `98${sufixo}`,
    nome: `Candidato QA ${sufixo}`,
    data: '2000-05-15',
    genero: 'Masculino',
  };

  cy.get(el(ids.registerMatricula)).type(dadosNovoAluno.matricula);
  cy.get(el(ids.registerNome)).type(dadosNovoAluno.nome);
  cy.get(el(ids.registerData)).invoke('val', dadosNovoAluno.data).trigger('change');
  cy.get(el(ids.registerGenero)).select(dadosNovoAluno.genero);
});

When('eu clico no botão para salvar', () => {
  cy.get(el(ids.saveStudentButton)).click();
});

When('eu clico no botão para salvar sem preencher o formulário', () => {
  cy.get(el(ids.saveStudentButton)).click();
});

When('clico no botão para salvar', () => {
  cy.get(el(ids.saveStudentButton)).click();
});

Then('o sistema cadastra o aluno', () => {
  cy.get(el(ids.registrationPanel)).should('have.class', 'hidden');
});

Then('exibe uma mensagem de sucesso', () => {
  cy.get(el(ids.toast), { timeout: 8000 }).should('contain.text', 'sucesso');
});

Then('o novo aluno passa a ser exibido na lista', () => {
  cy.get(el(ids.studentsTableBody)).should('contain', dadosNovoAluno.nome);
});

When('eu clico na opção de editar em um aluno específico na lista', () => {
  cy.buscarAlunoNaLista(jose);
  cy.get(`${btnAcao('edit')}[data-matricula="${jose}"]`).click();
});

When('altero os dados permitidos no formulário', () => {
  nomeEditado = `José editado ${Date.now()}`;
  cy.get(el(ids.registerNome)).clear().type(nomeEditado);
});

Then('o sistema atualiza as informações do aluno', () => {
  cy.get(el(ids.registrationPanel)).should('have.class', 'hidden');
});

Then('a lista reflete os dados atualizados', () => {
  cy.get(el(ids.studentsTableBody)).should('contain', nomeEditado);
});

When('eu clico na opção de excluir um aluno específico', () => {
  cy.buscarAlunoNaLista(felipe);
  cy.get(`${btnAcao('delete')}[data-matricula="${felipe}"]`).click();
});

When('o sistema exibe a modal de confirmação', () => {
  cy.get(el(ids.deleteModal)).should('not.have.class', 'hidden');
});

When('eu confirmo a exclusão', () => {
  cy.get(el(ids.confirmDeleteBtn)).click();
});

Then('o sistema remove o aluno', () => {
  cy.get(el(ids.deleteModal)).should('have.class', 'hidden');
});

Then('o aluno não é mais exibido na lista de registros', () => {
  cy.get(el(ids.studentsTableBody)).should('not.contain', 'Felipe Menezes');
});

Then('o sistema exibe mensagens de erro nos campos obrigatórios', () => {
  cy.get(el(ids.registerMatriculaError)).should('not.be.empty');
  cy.get(el(ids.registerNomeError)).should('not.be.empty');
  cy.get(el(ids.registerDataError)).should('not.be.empty');
  cy.get(el(ids.registerGeneroError)).should('not.be.empty');
});

Then('nenhum toast de sucesso é exibido', () => {
  cy.get(el(ids.toast)).should('not.contain.text', 'sucesso');
});

Given('que existe o aluno {string} na listagem', (nome) => {
  cy.buscarAlunoNaLista(nome);
  cy.get(el(ids.studentsTableBody)).should('contain', nome);
});

When('eu clico na opção de excluir o aluno {string}', (nome) => {
  cy.buscarAlunoNaLista(nome);
  cy.get(`${el(ids.studentsTableBody)} tr`).contains('td', nome).parents('tr').find(btnAcao('delete')).click();
});

When('eu cancelo a exclusão na modal', () => {
  cy.get(el(ids.cancelDeleteBtn)).click();
});

Then('o aluno {string} continua exibido na lista', (nome) => {
  cy.get(el(ids.studentsTableBody)).should('contain', nome);
});

When('eu navego para a próxima página da listagem', () => {
  cy.get(el(ids.nextPage)).should('not.be.disabled').click();
});

Then('a paginação indica que não estou mais na primeira página', () => {
  cy.get(el(ids.pageIndicator)).should('contain', 'Página 2');
});

Then('a tabela exibe registros da página atual', () => {
  cy.get(`${el(ids.studentsTableBody)} tr`).should('have.length.at.least', 1);
});
