# Testes - Resumo

## Conceitos-chave

### Tipos de testes
- **Unitario**: funcao isolada, rapido, sem I/O
- **Integracao**: multiplos modulos juntos
- **E2E**: fluxo completo do usuario

### AAA Pattern
Arrange (preparar) → Act (executar) → Assert (verificar)

### Mocks
- **Stub**: retorna valor fixo
- **Spy**: registra chamadas
- **Mock**: stub + spy + expectativas

### Injecao de Dependencia
Passar dependencias como parametro ao inves de hardcode. Permite trocar por mocks nos testes.

## Fluxo Mental

1. O que estou testando? → 2. Quais dependencias preciso isolar? → 3. Arrange: preparar → 4. Act: executar → 5. Assert: verificar
