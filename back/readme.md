Passo 1: Configuração do Docker com PostgreSQL
Primeiro, crie um arquivo docker-compose.yml para configurar o PostgreSQL dentro de um container Docker.

Crie um arquivo chamado docker-compose.yml na raiz do seu projeto com o seguinte conteúdo:
yaml
Copiar
version: '3.1'

services:
  db:
    image: postgres:13
    container_name: medical_appointment_db
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: medical_appointment_db
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  pg_data:
    driver: local

networks:
  app-network:
    driver: bridge
Aqui, estamos configurando um container PostgreSQL com as seguintes variáveis de ambiente:

POSTGRES_USER: o nome de usuário para o banco de dados.
POSTGRES_PASSWORD: a senha do usuário.
POSTGRES_DB: o nome do banco de dados.
Passo 2: Rodar o Docker
Depois de criar o arquivo docker-compose.yml, no terminal, execute o seguinte comando para rodar o Docker e iniciar o PostgreSQL:

bash
Copiar
docker-compose up -d
Isso vai iniciar o container com PostgreSQL rodando em segundo plano (modo detached). O banco de dados estará disponível na porta 5432 da sua máquina local.

Passo 3: Configuração do Projeto Node.js
Agora, vamos configurar o Sequelize no seu projeto Node.js.

Se ainda não fez isso, inicialize um projeto Node.js (se você ainda não tiver o package.json):
bash
Copiar
npm init -y
Instale as dependências necessárias:
bash
Copiar
npm install sequelize pg pg-hstore
npm install --save-dev sequelize-cli
Passo 4: Configuração do Sequelize CLI
Com o sequelize-cli instalado, precisamos configurar o arquivo de configuração do Sequelize para apontar para o banco de dados PostgreSQL no Docker. Crie uma pasta config na raiz do seu projeto e dentro dela crie o arquivo config.json com o seguinte conteúdo:

json
Copiar
{
  "development": {
    "username": "user",
    "password": "password",
    "database": "medical_appointment_db",
    "host": "db",
    "dialect": "postgres"
  },
  "test": {
    "username": "user",
    "password": "password",
    "database": "medical_appointment_db_test",
    "host": "db",
    "dialect": "postgres"
  },
  "production": {
    "username": "user",
    "password": "password",
    "database": "medical_appointment_db_prod",
    "host": "db",
    "dialect": "postgres"
  }
}
Observe que o host é definido como db (que é o nome do serviço no docker-compose.yml).

Passo 5: Inicializar o Sequelize
Agora, no terminal, execute o seguinte comando para inicializar a estrutura básica do Sequelize (se você ainda não fez isso):

bash
Copiar
npx sequelize-cli init
Esse comando criará a seguinte estrutura de pastas no seu projeto:

config/: Configurações do banco de dados.
models/: Modelos do Sequelize.
migrations/: Pastas para as migrações.
seeders/: Pastas para os dados iniciais (seeds).
Passo 6: Criar a Primeira Migração
Agora você pode criar suas migrações. Por exemplo, para criar a tabela users, execute:

bash
Copiar
npx sequelize-cli migration:generate --name appointments
Esse comando cria um arquivo de migração na pasta migrations/. O conteúdo do arquivo de migração será algo assim:

js
Copiar
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
Passo 7: Rodar as Migrações
Agora, para rodar a migração e criar as tabelas no banco de dados, use o comando:

bash
Copiar
npx sequelize-cli db:migrate
Esse comando executa todas as migrações pendentes e cria a tabela Users no banco de dados.

Passo 8: Confirmar a Criação da Tabela
Após rodar a migração, você pode confirmar que a tabela foi criada no banco de dados. Você pode acessar o container do PostgreSQL no Docker e fazer uma consulta SQL:

bash
Copiar
docker exec -it medical_appointment_db psql -U user -d medical_appointment_db
Depois, no terminal do psql, execute:

sql
Copiar
\d
Isso exibirá as tabelas no banco de dados. Se tudo correu bem, você verá a tabela Users.

Passo 9: Reverter Migrações (se necessário)
Se você precisar reverter a migração, pode usar o seguinte comando:

bash
Copiar
npx sequelize-cli db:migrate:undo
Passo 10: Rodar a Aplicação (opcional)
Se sua aplicação Node.js estiver configurada corretamente para interagir com o banco de dados, você pode rodá-la:

bash
Copiar
node app.js
Resumo dos comandos principais:
Criar migração: npx sequelize-cli migration:generate --name <nome-da-migração>
Rodar migrações: npx sequelize-cli db:migrate
Reverter migrações: npx sequelize-cli db:migrate:undo
Ver status das migrações: npx sequelize-cli db:migrate:status
Acessar banco no Docker: docker exec -it <nome-do-container> psql -U <usuario> -d <nome-do-banco>
Com esses passos, você pode facilmente criar e rodar migrações no seu banco de dados PostgreSQL usando o Sequelize com Node.js e Docker. Se tiver alguma dúvida ou problema, me avise!