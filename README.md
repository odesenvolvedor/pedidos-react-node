# Aplicação para controle de pedidos básico - NodeJS + Sequelize + React

Api implementada em NodeJS + Express + Sequelize
Frontend implementado com React

## Requisitos

- NodeJS LTS (ou superior)
- Postgres
- Docker (opcional)

### Uso

1. Clonar o repositório:

```sh
$ git clone https://github.com/odesenvolvedor/pedidos-react-node.git [ProjectName]
$ cd [ProjectName]
$ cd api
$ npm install
$ vi .env # ajustar os parâmetros de configuração
$ cd ..
$ cd frontend
$ npm install
```

### Executando o Docker via Compose

O arquivo `docker-compose.yml` já contém a imagens para sistemas de banco de dados Postgres, com seus devidos sistemas de administração.

Para subir as imagens execute o comando na raiz do projeto:

```bash
$ docker-compose up
```

#### Serviços

##### Postgres

Painel de Administração:

* Administração: http://localhost:8000
* Usuário: `admin@admin.com`
* Senha: `secret`

Banco de Dados:

* Usuário: `postgres`
* Senha: `secret`
* BD: `develop`

## Dúvidas

Se você curtiu esse projeto ou está com dúvidas envie um e-mail para: fernando@odesenvolvedor.net

## Licença

MIT
