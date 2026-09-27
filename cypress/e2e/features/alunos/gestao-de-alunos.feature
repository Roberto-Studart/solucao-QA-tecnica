# language: pt
Funcionalidade: Gestão de alunos
  Como usuário autenticado
  Quero cadastrar, buscar, editar e excluir alunos
  Para manter o cadastro acadêmico atualizado

  Contexto:
    Dado que sou usuário autenticado na tela de alunos

  Cenário: Cadastro de aluno bem sucedido
    Quando eu clico na opção para cadastrar um novo aluno
    E preencho os campos obrigatórios do formulário com dados válidos
    E eu clico no botão para salvar
    Então o sistema cadastra o aluno
    E exibe uma mensagem de sucesso
    E o novo aluno passa a ser exibido na lista

  Cenário: Busca de alunos com resultados
    Quando preencho a busca com um dado válido referente ao "<filtro>"
    Então o sistema filtra a lista de alunos
    E exibe na tela apenas os registros correspondentes à busca

    Exemplos:
      | filtro    |
      | Nome      |
      | Matrícula |

  Cenário: Edição de um aluno existente
    Quando eu clico na opção de editar em um aluno específico na lista
    E altero os dados permitidos no formulário
    E clico no botão para salvar
    Então o sistema atualiza as informações do aluno
    E exibe uma mensagem de sucesso
    E a lista reflete os dados atualizados

  Cenário: Exclusão de um aluno bem sucedida
    Quando eu clico na opção de excluir um aluno específico
    E o sistema exibe a modal de confirmação
    E eu confirmo a exclusão
    Então o sistema remove o aluno
    E exibe uma mensagem de sucesso
    E o aluno não é mais exibido na lista de registros
