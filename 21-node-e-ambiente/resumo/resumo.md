# Node.js e Ambiente - Resumo

## Conceitos-chave

### Node.js
Runtime JS fora do browser. V8 (engine) + libuv (I/O assincrono). Single-threaded mas nao-bloqueante.

### HTTP
`http.createServer` recebe callback com `(req, res)`. req = stream de entrada, res = stream de saida. Sempre chamar `res.end()`.

### Filesystem
`fs/promises` para async (recomendado), `fs.*Sync` so para scripts CLI. Usar `path.join` para caminhos. Streams para arquivos grandes.

### Diferenca Browser vs Node
| Browser | Node |
|---------|------|
| window, document | global, process |
| fetch (nativo) | fetch (v18+) ou http |
| localStorage | fs |
| DOM APIs | OS APIs |

## Fluxo Mental

Codigo JS → V8 compila → I/O vai para libuv → callback volta para o event loop → resultado no seu codigo
