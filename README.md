# Solução QA técnica

Testes E2E da aplicação: https://desafio-qa-gamma.vercel.app/

## Organização

- `cypress/e2e/features/` — cenários do desafio + alguns extras que escrevi
- `cypress/e2e/step-definitions/` — implementação  dos passos
- `cypress/support/selectors.js` — ids do HTML que usei nos `cy.get`
- `cypress/fixtures/usuario.json` — credenciais para login inválido/válido