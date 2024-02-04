# E-Commerce API

Este projeto é uma API de e-commerce para venda de camisetas, canecas e adesivos. Este projeto segue a arquitetura MVC (Model-View-Controller).
###Model: As entidades do seu projeto (User, Product, PurchaseOrder, PurchaseOrderItems) representam o Model. Eles contêm a lógica para acessar os dados do banco de dados.

###View: Em uma API RESTful como a sua, a “view” seria a representação dos dados enviados ao cliente. No seu caso, são as respostas JSON que sua API envia.

###Controller: Os controllers (UserController, ProductController, PurchaseOrderController, PurchaseOrderItemsController) contêm a lógica de negócios. Eles determinam o que acontece quando um cliente faz uma solicitação específica para sua API.

## Funcionalidades

- Gerenciamento de produtos (criação, deleção, atualização)
- Busca de produtos com paginação e com a possibilidade de utilização de filtros
- Busca por de produto por id
- Busca de produtos por categoria
- Gerenciamento de usuários (criação, deleção, atualização, leitura)
- Geração de pedido de compras com produtos selecionados
- Histórico de pedidos
- Permitir filtrar pedidos gerados

## Instalação

1. Clone este repositório
2. Instale as dependências com:
`npm i typescript ts-node-dev`
npm i express cors helmet
npm i -D @types/express @types/cors @types/helmet
npm i -D prisma
npx prisma init
3. Crie um arquivo `.env` na raiz do projeto e preencha-o com as informações do seu banco de dados (veja o arquivo `.env.example` para um exemplo)
4. Execute as migrações com `npx prisma migrate dev`
5. Inicie o servidor com `npm start`

## Uso

A API possui as seguintes rotas:

- `/products`: GET, POST, PUT, DELETE
- `/users`: GET, POST, PUT, DELETE
- `/purchaseOrder`: GET, POST, PUT, DELETE
- `/purchaseOrderItems`: GET, POST, DELETE


