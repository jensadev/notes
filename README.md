# Node + express + sequelize

Började med  denna [tutorial](https://stackabuse.com/using-sequelize-orm-with-nodejs-and-express/) 
men som författaren skriver så bör Migrations användas.
Därför + [migrations](https://sequelize.org/v6/manual/migrations.html) från sequelize manualen.

Koden finns i repot, instruktionerna här.
Första steget är att få det att funka och använda sqlite.

# Setup

```bash
npm install sequelize sequelize-cli sqlite3
```

```bash
npx sequelize-cli init
```

Init gör följande enligt manualen.

* config, contains config file, which tells CLI how to connect with database
* models, contains all models for your project
* migrations, contains all migration files
* seeders, contains all seed files

Eftersom config kan innehålla passwords och annat.

.gitignore ```config/config.json```

Redigera ```config/config.json```
```json
"development": {
    "dialect": "sqlite",
    "storage": "database.sqlite"
},
```

Har du klonat detta repo och behöver en config.
```bash
npx sequelize-cli init:config
```

# Model/Migration

Notera att tag är inte jättebäst och kommer faila normalisering. Vi får fixa det senare.
```bash
npx sequelize-cli model:generate --name Note --attributes note:string,tag:string
```

Enligt sequelize manualen gör detta följande:

* Create a model file user in models folder
* Create a migration file with name like XXXXXXXXXXXXXX-create-user.js in migrations folder

# Seed

För att skapa lite testdata kan vi använda en seeder.

Skapa seedern med:

```bash
npx sequelize-cli seed:generate --name demo-notes
```

Redigera filen ```seeders/###-demo-notes.js```:

```js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Notes',
            [
                {
                    note: 'pick up some bread after work',
                    tag: 'shopping',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    note: 'remember to write up meeting notes',
                    tag: 'work',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    note: 'learn how to use node orm',
                    tag: 'work',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Notes', null, {});
    }
};
```

För att seeda kör sedan:
```bash
npx sequelize-cli db:seed:all
```

Utan fel så har vi nu en databas med data. 🎉

# So far so good...

```bash
npm install --save nodemon
```

Redigera ```package.json``` startscript:
```json
  "scripts": {
    "start": "nodemon ./bin/www"
  },
```

Redigera ```app.js```:
```js
const apiRouter = require('./routes/api-router');

app.use('/', apiRouter);
```

Routes fil, ```routes/api-router.js```:
```js
const { Note } = require('../models');

router.get('/notes', function (req, res) {
    Note.findAll().then((notes) => res.json(notes));
});
```

Provkör med [Thunder client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) i vscode.
Surfa till localhost:3000/notes

👍

# Routes

Testa, här finns det arbete att göra. Fel osv.

## GET 

```/notes/```

**Response**

```json
[
  {
    "id": 1,
    "note": "pick up some bread after work",
    "tag": "shopping",
    "createdAt": "2021-10-06T07:47:45.330Z",
    "updatedAt": "2021-10-06T07:47:45.330Z"
  },
  {
    "id": 2,
    "note": "remember to write up meeting notes",
    "tag": "work",
    "createdAt": "2021-10-06T07:47:45.330Z",
    "updatedAt": "2021-10-06T07:47:45.330Z"
  }
]
```

**Search ?tag**

```/notes/search?tag=shopping```

**Response**

```json
[
  {
    "id": 1,
    "note": "pick up some bread after work",
    "tag": "shopping",
    "createdAt": "2021-10-06T07:47:45.330Z",
    "updatedAt": "2021-10-06T07:47:45.330Z"
  }
]
```

**Search :id**

```/notes/2```

**Response**

```json
[
  {
    "id": 2,
    "note": "remember to write up meeting notes",
    "tag": "work",
    "createdAt": "2021-10-06T07:47:45.330Z",
    "updatedAt": "2021-10-06T07:47:45.330Z"
  }
]
```
# POST

```/notes```

**Payload**

```json
{
    "note": "Testing",
    "tag": "work"
}
```

**Response**

```json
{
  "id": 5,
  "note": "Testing",
  "tag": "work",
  "updatedAt": "2021-10-06T07:56:16.289Z",
  "createdAt": "2021-10-06T07:56:16.289Z"
}
```

# PUT

```/notes/5```

**Payload**

```json
{
    "note": "Updates",
    "tag": "work"
}
```
**Response**
```json
{
  "id": 5,
  "note": "Updates",
  "tag": "work",
  "createdAt": "2021-10-06T07:56:16.289Z",
  "updatedAt": "2021-10-06T07:57:06.025Z"
}
```
# DELETE

```/notes/5```

**Response**

```OK```
