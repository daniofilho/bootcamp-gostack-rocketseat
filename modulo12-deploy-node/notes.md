# Deploy - Node JS

## Hospedagem

A hospedagem mais barata recomendada é a Digital Ocean.

Lá dentro, após configurar o método de pagamento, crie um novo Droplet.

**Image**

Marketplace => Docker (para já vir o docker configurado)

**Plan**

valor do plano

**Datacenter Region**

Geralmente selecione New York ou San Francisco

**Authentication**

Via SSH Key

- New SSH Key
- se estiver no windows, siga os passos ao lado para gerar um keygen, no linux ou mac rode `ssh-keygen` e siga os passos para gerar a key
- abra o arquivo com a key gerada usando o comando `cat ~/.ssh/id_rsa.pub`, copie o conteúdo e cole no campo SSH Key content

São basicamente essas opções principais.

### Acesso a hospedagem

Após a criação do servidor, acesse via SSH usando:

`ssh root@IP_DA_MAQUiNA` e faça a autenticação.

### Update e Upgrade

Após o login, rode `apt update` e `apt upgrade` para atualizar todos os pacotes do server.

### Criar novo usuário

Crie um novo usuário para evitar fazer todas as alterações e instalações como root:

`adduser deploy`

e preencha as informações como solicitado.

Em seguida dê as permissões para ele:

`usermod -aG sudo deploy`

Agora precisamos permitir que o usuário acesse via ssh também

`cd /home/deploy` => navega até a pasta do usuário criado
`mkdir .ssh` => cria a pasta .ssh, caso não exista

CERTIFIQUE DE QUE ESTÁ NA PASTA `home/deploy/.ss` antes de executar o comando abaixo

`cp ~/.ssh/authorized_keys .` => copia a chave de ssh autorizada para a home desse usuário também

`chown deploy:deploy authorized_keys` => troca o dono dessa pasta para o usuário criado

Para verificar se a pasta está com as permissões necessárias, rode `ls -la` e irá listar todos os arquivos e pastas com seus respectivos owners.

Agora já será possível logar via SSH utilizando o usuário recém criado.

### Instalando NodeJS e NPM

#### NodeJS

https://github.com/nodesource/distributions/blob/master/README.md

Procure pela versão estável e instale:

```t
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Agora basta rodar `node -v` e `npm -v` para verificar a instalação.

### Clonando arquivos utilizando Git

Crie seu projeto no github e tenha o link dele em mãos pois vamos clona-lo dentro do servidor para "subir" os arquivos para ele.

Certifique-se de que está na raiz do servidor com `cd ~` e rode:

`git clone LINK_DO_PROJETO NOME_DO_PROJETO`

Em seguida rode `npm install` para instalar a dependências

**A partir daqui as configurações são peculiares de cada projeto.**

### Arquivo .env

`cp .env.example .env` => para copiar o conteúdo de um arquivo para dentro de um novo
`vim .env` => para abrir o arquivo e editar ele

Para salvar o arquivo, aperte `ESQ`, em seguida digite :wq (w => write/save, q=> quit)

Para fechar sem salvar, aperte `ESQ` e `:q!`

### Docker

para que o Docker possa ser executado sem precisar ficando dando `sudo su` sempre, procure por "Docker Post installation steps for linux":

https://docs.docker.com/install/linux/linux-postinstall/

e siga os passos descritos.

Ao final, instale os Dockers conforme o seu projeto necessita.

### Criando bancos postgres

`docker exec -i -t postgres /bin/sh` => para entrar no terminal do docker dentro do banco selecionado

`su postgres` => para alternar para o usuário postgres criado

`psql` => para entrar na linha de comando que permite criar o banco

`CREATE DATABASE nome_do_banco` => para criar o banco

`\q` => para sair do psql

`exit` => para ir saindo e voltar ao terminal do linux normal

**(ou crie o banco usando o postbird mesmo)**

Ao final, não esqueça de rodar as migrations:

`npx sequelize db:migrate`

### Package.json

É importante configurar no package.json uma forma de rodar o servidor sem precisar rodar serviços desnecessários. Para isso será necessário incluir mais scripts no package.json.

```json
 "scripts": {
    "dev": "nodemon src/server.js",
    "queue": "nodemon src/queue.js",
    "build": "sucrase ./src -d ./dist --transforms imports",
    "start": "node dist/server.js"
  },
```

Lembrando que essas alterações são feitas na máquina, commitados pro github e só depois "baixados no servidor.

Ao final, rode `npm run build` e `npm run start` para criar um build do servidor e rodar a aplicação.

### Liberar portas do server para acesso externo

Por padrão o Firewall vem configurado e ativo, então é necessário liberar as portas que for usar:

`sudo ufw allow PORTA`

### Adicionais

#### Parar processo node após cair a conexão com o servidor

`lsof -u :3333` => mostra todos os serviços rodando nessa porta, irá listar um PID do processo rodando o node

`kill -9 PID` => para matar o processo

#### Manter a conexão aberta por mais tempo

`sudo vim /etc/ssh/sshd_config`

Coloque as seguintes configurações no arquivo aberto e salve:

```
ClientAliveInterval 30
TCPKeepAlive yes
ClientAliveCountMax 99999
```

Para concluir, rode `sudo service sshd restart`, faça logout no ssh e login novamente.

#### Rodando o node para a porta 80

Instale uma ferramenta de proxy reverso chamado NGIX

Acesse a pasta do projeto e o instale

`sudo apt install nginx`

Agora o servidor já está acessível, mas será necessário começar a liberar as portas:

`sudo ufw allow 80`

Agora precisamos fazer o redirecionamento da porta 80 para a 3333

`sudo vim /etc/nginx/sites-available/default`

Deixe o conteúdo do documento arquivo assim:

```
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name _;

  location / {
    proxy_pass http://localhost:3333;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

}
```

em seguida:

`sudo service nginx restart` => resetar o serviço nginx

`sudo nginx -t` => testando se está tudo em ordem

#### Manter a aplicação rodando sempre mesmo que o terminal seja fechado

`sudo npm install -g pm2` => instalando lib de dependencia

Agora basta rodar o servidor usando o pm2

`npm run build` => para criar o pacote antes

`pm2 start dist/server.js` => roda

`pm2 list` => mostra os serviços executando dentro da máquina

Agora o servidor fica rodando mesmo com o terminal fechado, porém se o servidor desligar, o pm2 não volta automaticamente.

Para isso, rode `pm2 startup systemd`

Ele irá gerar um comando com uma string que precisaremos incluir no path do servidor

`sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u deploy --hp /home/deploy`

feito:

```
Target path
/etc/systemd/system/pm2-deploy.service
Command list
[ 'systemctl enable pm2-deploy' ]
[PM2] Writing init configuration in /etc/systemd/system/pm2-deploy.service
[PM2] Making script booting at startup...
[PM2] [-] Executing: systemctl enable pm2-deploy...
Created symlink /etc/systemd/system/multi-user.target.wants/pm2-deploy.service → /etc/systemd/system/pm2-deploy.service.
[PM2] [v] Command successfully executed.
+---------------------------------------+
[PM2] Freeze a process list on reboot via:
$ pm2 save

[PM2] Remove init script via:
$ pm2 unstartup systemd
```

`pm2 monit` => abre um monitor para visualizar logs

### Integração contínua - fazer tudo isso que foi feito até agora de forma automática

buddy.works

https://buddy.works/

- Faça Login, de preferência com o Github
- Procure na lista o projeto do Github para adicionar
- Adicioone uma pipeline
- - name: Build & Deploy
- - trigger mode: On Push
- - Branch: master
- Agora procure Digital Ocean e a opção Droplet na lista
- configure essa Action com os campos que pede
- adicione a chave buddy ssh no seu servidor conforme instruido
- configure os comandos que o servidor deve executar

```
npm install
npm run build
npx sequelize db:migrate
pm2 restart server
```

- configure o dados do servidor e o working directory correto
- Adiciona a Action
- Por ultimo, procure na lista uma action de e-mail, para que você receba um e-mail de report.
