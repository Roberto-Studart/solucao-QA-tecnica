# language: pt
Funcionalidade: Autenticação no portal
  Como usuário do portal
  Quero autenticar com matrícula e senha
  Para acessar a listagem de alunos

  Cenário: Login mal sucedido
    Dado que estou na tela de login da aplicação
    Quando eu preencho o campo de matrícula com "<matricula>"
    E eu preencho o campo de senha com "<senha>"
    E clico no botão de acessar
    Então o sistema exibe uma mensagem de erro correspondente
    E permaneço na tela de login

    Exemplos:
      | matricula        | senha             |
      | dados inválidos  | dados inválidos   |
      | dados em branco  | dados em branco   |

  Cenário: Login bem sucedido
    Dado que estou na tela de login da aplicação
    Quando eu preencho o campo de matrícula com "2620101"
    E eu preencho o campo de senha com "12345678"
    E clico no botão de acessar
    Então sou redirecionado para a tela de listagem de alunos

  Cenário: Logout do sistema
    Dado que sou usuário autenticado no sistema
    E que estou na tela de alunos
    Quando eu clico no botão de sair
    Então o sistema encerra a minha sessão
    E sou redirecionado para a tela de acesso à aplicação
