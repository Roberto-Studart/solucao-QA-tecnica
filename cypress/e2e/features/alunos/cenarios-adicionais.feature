# language: pt
Funcionalidade: Outros casos que notei na tela

  Cenário: Cadastro mal sucedido por campos obrigatórios vazios
    Dado que sou usuário autenticado na tela de alunos
    Quando eu clico na opção para cadastrar um novo aluno
    E eu clico no botão para salvar sem preencher o formulário
    Então o sistema exibe mensagens de erro nos campos obrigatórios
    E nenhum toast de sucesso é exibido

  Cenário: Cancelamento da exclusão mantém o aluno na lista
    Dado que sou usuário autenticado na tela de alunos
    E que existe o aluno "Luiza Garcia" na listagem
    Quando eu clico na opção de excluir o aluno "Luiza Garcia"
    E o sistema exibe a modal de confirmação
    E eu cancelo a exclusão na modal
    Então o aluno "Luiza Garcia" continua exibido na lista

  Cenário: Paginação exibe próxima página de resultados
    Dado que sou usuário autenticado na tela de alunos
    Quando eu navego para a próxima página da listagem
    Então a paginação indica que não estou mais na primeira página
    E a tabela exibe registros da página atual

  Cenário: Matrícula com tamanho inválido no login
    Dado que estou na tela de login da aplicação
    Quando eu preencho o campo de matrícula com "123456"
    E eu preencho o campo de senha com "12345678"
    E clico no botão de acessar
    Então o sistema exibe erro de validação no campo matrícula
    E permaneço na tela de login
