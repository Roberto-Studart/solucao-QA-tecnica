// ids da tela: https://desafio-qa-gamma.vercel.app/

export const ids = {
  loginView: 'login-view',
  loginTitle: 'login-title',
  matricula: 'matricula',
  matriculaError: 'matricula-error',
  senha: 'senha',
  senhaError: 'senha-error',
  formFeedback: 'form-feedback',
  loginSubmitBtn: 'login-submit-btn',

  studentsView: 'students-view',
  studentsTitle: 'students-title',
  addStudentButton: 'add-student-button',
  logoutButton: 'logout-button',
  studentSearch: 'student-search',

  registrationPanel: 'student-registration-panel',
  registrationPanelTitle: 'registration-panel-title',
  registerMatricula: 'register-matricula',
  registerMatriculaError: 'register-matricula-error',
  registerNome: 'register-nome',
  registerNomeError: 'register-nome-error',
  registerData: 'register-data',
  registerDataError: 'register-data-error',
  registerGenero: 'register-genero',
  registerGeneroError: 'register-genero-error',
  saveStudentButton: 'save-student-button',

  studentsTableBody: 'students-table-body',
  paginationStatus: 'pagination-status',
  pageIndicator: 'page-indicator',
  nextPage: 'next-page',

  deleteModal: 'delete-modal',
  deleteModalText: 'delete-modal-text',
  cancelDeleteBtn: 'cancel-delete-btn',
  confirmDeleteBtn: 'confirm-delete-btn',

  toast: 'toast',
};

export const el = (id) => `#${id}`;
export const btnAcao = (acao) => `[data-action="${acao}"]`;
