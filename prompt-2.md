# Prompt Reutilizavel — Gerar Novo Modulo

Use este prompt para criar novos modulos seguindo o padrao do projeto Javascript-anatomia.

---

## Prompt Template

```
Estou estudando JavaScript usando uma estrutura modular em pastas.
Os modulos ficam em: c:\Users\faith\OneDrive\Area de Trabalho\Projects\Javascript-anatomia\

Cada modulo segue este formato:

XX-nome-do-modulo/
├── README.md           ← Visao geral + mapa do modulo
├── topico-1.md         ← Arquivo por subtema
├── topico-2.md
├── resumo/
│   ├── resumo.md       ← Resumo direto dos conceitos
│   └── avancado.md     ← Visao profunda, mental models, pegadinhas
├── projetos/
│   └── README.md       ← 2-4 projetos praticos com codigo completo
└── desafios/
    └── README.md       ← 5 desafios do basico ao avancado

---

## Regras de conteudo para cada arquivo .md de topico:

1. **O que e?** — Definicao clara e concisa
2. **Por que existe?** — Qual problema resolve
3. **Como funciona?** — Explicacao tecnica com detalhes internos
4. **Exemplo minimo** — Menor codigo possivel que demonstra o conceito
5. **Exemplo real** — Caso de uso pratico do dia a dia
6. **Erros comuns** — Pegadinhas e como evita-las
7. **Mini-projeto** — Exercicio pratico para fixar

---

## Regras para README.md do modulo:

- Visao geral do tema
- Lista de topicos cobertos com links
- Modelo mental (como o JS "pensa" sobre isso)
- Conexao com outros modulos
- Diagrama ASCII quando aplicavel

---

## Regras para resumo/resumo.md:

- Explicacao clara e direta
- Juntar os conceitos principais do modulo
- Sem enrolacao
- Estruturado em secoes
- Pode ter exemplos simples
- Terminar com secao "Fluxo Mental" explicando como os conceitos se conectam

---

## Regras para resumo/avancado.md:

- Explicacao mais profunda
- Funcionamento real do JavaScript
- Mental models (como o JS pensa)
- Exemplos comentados
- Pegadinhas comuns
- Comparacoes importantes
- Sem ser gigante, mas com profundidade

---

## Regras para projetos/README.md:

- 2 a 4 projetos praticos
- Codigo completo e funcional
- Comentarios explicativos
- Crescimento progressivo de complexidade

---

## Regras para desafios/README.md:

- 5 desafios
- Do basico ao avancado
- Incluir codigo inicial quando aplicavel
- Descrever o resultado esperado

---

## Regras gerais:

- Linguagem: Portugues (Brasil)
- Sem acentos nos nomes de arquivos
- Codigo em JavaScript com comentarios em portugues
- Nao repetir conteudo entre resumo.md e avancado.md
- Manter consistencia com os modulos existentes (01-23)
- Usar ## para headers principais, ``` para blocos de codigo

---

Agora crie o modulo XX-[NOME] seguindo exatamente este padrao.
Gere TODOS os arquivos completos, um por um.
```

---

## Como usar

1. Copie o prompt acima
2. Substitua `XX-[NOME]` pelo numero e nome do novo modulo (ex: `24-typescript-basico`)
3. Ajuste os nomes dos topicos conforme o tema
4. Cole no chat e o agente criara todos os arquivos seguindo o padrao
