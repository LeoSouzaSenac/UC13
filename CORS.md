# O Que é CORS?

**CORS** (*Cross-Origin Resource Sharing*) é um mecanismo de segurança que os navegadores utilizam para controlar quais recursos de um servidor podem ser acessados por páginas da web que estão sendo servidas de um domínio diferente. Ele foi criado para resolver o problema de segurança relacionado à **política de mesma origem**, que impede que sites façam requisições para diferentes domínios sem permissão.

## Para Que Serve o CORS?

CORS permite que servidores indiquem explicitamente quais origens (domínios, protocolos ou portas) têm permissão para acessar seus recursos. Isso é feito através de cabeçalhos HTTP. Se o servidor não permitir, o navegador bloqueará a requisição, protegendo os usuários de possíveis ataques e acessos indesejados.

### Exemplo de Cenário:

- Seu site está hospedado em `http://meusite.com`
- Sua API está hospedada em `http://api.externa.com`
  
Se o site tentar fazer uma requisição à API, o navegador irá bloquear essa tentativa, a menos que a API esteja configurada para permitir essa requisição através do CORS.

## Por Que Usamos CORS no Código?

No seu projeto, utilizamos CORS para permitir que o **frontend** (página web) possa se comunicar com o **backend** (servidor Express) mesmo que eles estejam hospedados em domínios diferentes. Sem habilitar o CORS, o navegador bloquearia essas requisições entre origens distintas.

### Como Usamos o CORS?

No servidor Express, usamos o middleware `cors` para liberar as requisições de diferentes fontes. Isso é necessário para garantir que o frontend (cliente) possa acessar a API sem problemas de bloqueio.

### Código para Habilitar CORS:

Instalamos o pacote `cors` e o aplicamos no servidor:

```bash
npm install cors
```

No código do servidor Express:

```javascript
const cors = require('cors');
const express = require('express');
const app = express();

// Habilitando CORS para permitir requisições de todas as origens
app.use(cors());

app.get('/dados', (req, res) => {
    res.json({ message: 'Requisição recebida com sucesso!' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
```

### O Que Este Código Faz:

- **`app.use(cors())`**: Isso habilita o CORS em todas as rotas do servidor, permitindo que requisições de qualquer domínio sejam aceitas.
- **Requisições de qualquer origem**: Sem a configuração de CORS, apenas requisições do mesmo domínio seriam permitidas.

## Conclusão

O CORS é fundamental para permitir que seu frontend se comunique com um backend hospedado em um domínio diferente. Ao habilitar o CORS no servidor, você especifica quais origens podem fazer requisições à sua API, garantindo maior flexibilidade no desenvolvimento de aplicações web distribuídas.


