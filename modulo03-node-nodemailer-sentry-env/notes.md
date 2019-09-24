#### Nodemailer

lib que permite envio de e-mails através do node

#### Redis

Um serviço que será responsável por controlar filas de processos

```
docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
```

Para controlar as filas:

https://github.com/bee-queue/bee-queue

#### Sentry

Ferramenta para monitoramento de erros no node

https://sentry.io/welcome/

Erros que acontecem dentro das chamadas Async, por padrão, não são capturados. Para que isso aconteça é necessário instalar uma extensão

yarn add express-async-errors

#### .env

Arquivo para configurações de ambiente.

Deve ser adicionado ao .gitignore

Requer a lib `dotenv` para importar esse tipo de arquivo

`yarn add dotenv`

Modelo:

```
APP_URL=http://localhost:3333
NODE_ENV=development

# Auth

APP_SECRET=bootcampgobarbernode

# Database

DB_HOST=192.168.99.100
DB_USER=postgres
DB_PASS=docker
DB_NAME=gobarber

# Mongo

MONGO_URL=mongodb://192.168.99.100/gobarber

# Redis

REDIS_HOST=192.168.99.100
REDIS_PORT=6379

# Mail

MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=9bb23299c01924
MAIL_PASS=fae8bad95408c8

# Sentry

SENTRY_DSN=https://cfd2ab3234b34e57968baa2241438054@sentry.io/1545597

```

## Docker - Postgres

`docker run --name gobarber -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres`

## Docker - MnogoDB

`docker run --name mongobarber -p 27017:27017 -d -t mongo`

## Docker - Redis

`docker run --name redisbarber -p 6379:6379 -d -t redis:alpine`
