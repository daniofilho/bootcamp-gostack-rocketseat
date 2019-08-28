#### Nodemailer

lib que permite envio de e-mails através do node

#### Redis

Um serviço que será responsável por controlar filas de processos

```
docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
```

Para controlar as filas:

https://github.com/bee-queue/bee-queue
