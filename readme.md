# My advanced REST API NODEJS


---

#### This repo is a training of API REST with express and body parser for my diploma project of  Higher Technical Certificate (BTS).

---


- The master branch have a classe "members" with all CUDR methods (GET,PUT,POST,DELETE). 
- The SingleFileCUDR branch have a single file for CUDR
- The HTML branch use the classe "members" with front end vanilla JS.

> To test the API i preconise to use postman for HTTP request.
---

## Project setup

```
# Install dependecies


npm install
```

### Compiles and hot-reloads for development with nodemon

```
# serve with hot reload at localhost:8080

npm run start

# swaggers at localhost:8080/api/v1/api-docs/#/
```


### Structure of SingleFileCUDR

---

- This exemple show only for the specific ID


```js
let MembersRouter = express.Router()
MembersRouter.route('/:id')
```

- Get
```js
   .get((req,res)=> {
            let index = getIndex(req.params.id);

            if (typeof(index) == 'string'){
                res.json(error(index))
            }else{
                res.json(success(members[index]))
            }
            res.json(success(members[(req.params.id)-1].name))
        })
```


- Overwrite
```js
        .put((req,res)=> {
            let index = getIndex(req.params.id);
            if (typeof(index) == 'string'){
                res.json(error(index))
            }else{
                let same = false;
                for (let i = 0; i < members.length; i++){
                    if (req.body.name == members[i].name && req.params.id != members[i].id){
                        same = true
                        break
                    }
                }
                if (same){
                    res.json(error('same name'))
                }else{
                    members[index].name = req.body.name
                    res.json(success(true))
                }

            }
        })
```


- Delete
```js
        .delete((req,res)=> {
            let index = getIndex(req.params.id);
            if (typeof(index) == 'string'){
                res.json(error(index))
            } else {
                members.splice(index, 1)
                res.json(success(members))
            }
        })
```
---



### Members Classe

---


```js
   let MembersRouter = express.Router()
   let Members = require('./assets/classes/members-class')(db, config)
    MembersRouter.route('/:id')

```


```js
   let MembersRouter = express.Router()
   let Members = require('./assets/classes/members-class')(db, config)

```

```js
  MembersRouter.route('/:id')

        // Récupère un membre avec son ID

        .get(async (req, res) => {
            let member = await Members.getById(req.params.id)
            res.json(checkAndchange(member))
        })

        // Modifie un membre avec ID
        .put(async(req, res) => {
            let updateMember = await Members.update(req.params.id, req.body.name)
            res.json(checkAndchange(updateMember))
        })

        // Supprime un membre avec ID
        .delete(async (req, res) => {
            let deleteMember = await Members.delete(req.params.id)
            res.json(checkAndchange(deleteMember))
        })

```


### 2 - ASYNC DATA

- Understand async data

```js
console.log('Début')
setTimeout(() => {
    console.log('Temps d\'attentes')
},1500)
console.log('Fin')

```
- Callback
- Promise 

```js
new Promise((resolve, reject) => {
setTimeout(()=> {
resolve('All good')
}, 1500)
})
.then(message => console.log(message))  // Dans le cas si c'est ok
.catch(err => console.log(err.message)) // Dans le cas d'une erreur
```


- Async/Await

---

# Structure of the api (classes members)

###
The structure created with swaggers expresss.

```json

{
  "info": {
    "title": " DOCUMENTATION REST API",
    "version": "3.1.2",
    "license": {
      "name": "ISC"
    },
    "description": "template api rest"
  },
  "basePath": "/api/v1",
  "host": "localhost:8080",
  "tags": [
    {
      "name": "members",
      "description": "Méthodes permettant de gérer les utilisateurs"
    }

  ],
  "paths": {
    "members/{id}": {
      "get": {
        "tags": ["members"],
        "summary": "members/{id}",
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {}
      },
      "put": {
        "tags": ["members"],
        "summary": "members/{id}",
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {}
      },
      "delete": {
        "tags": ["members"],
        "summary": "members/{id}",
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {}
      }
    },
    "members": {
      "get": {
        "tags": ["members"],
        "summary": "members",
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "max",
            "in": "query",
            "required": false
          }
        ],
        "responses": {}
      },
      "post": {
        "tags": ["members"],
        "summary": "members",
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "name",
            "in": "body",
            "required": true
          }
        ],
        "responses": {}
      }
    }
  },
  "swagger": "2.0"
}

```
