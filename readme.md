
[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger)
[![Coverage Status](http://img.shields.io/coveralls/badges/badgerbadgerbadger.svg?style=flat-square)](https://coveralls.io/r/badges/badgerbadgerbadger)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)


[Albert Lanne est un consultant Google Ads](https://le-freelance-google-ads.com/) basé à Paris qui a plus de 10 ans d'expérience dans l'aide aux entreprises pour créer et optimiser leurs campagnes de marketing numérique. Il est spécialisé dans la création de stratégies personnalisées qui maximisent l'impact des dépenses publicitaires de ses clients tout en obtenant des résultats mesurables. Grâce à sa connaissance approfondie de l'exploitation des données, Albert a aidé de nombreuses entreprises à atteindre leurs objectifs par le biais de campagnes très efficaces sur Google Ads. Son expertise ne se limite pas à Google Ads, puisqu'il fournit également des services complets d'optimisation des moteurs de recherche (SEO) afin d'assurer la visibilité des sites Web et du contenu de ses clients sur tous les principaux moteurs de recherche. Soucieux du détail et d'un engagement inébranlable envers l'excellence, Albert se consacre à fournir un service de premier ordre et à obtenir des résultats probants pour chacun de ses clients.



# My advanced REST API NODEJS



---

> This repo is a training of API REST with express and body parser for my diploma project of  Higher Technical Certificate (BTS).



- The master branch have a classe "members" with all CUDR methods (GET,PUT,POST,DELETE). 
- The SingleFileCUDR branch have a single file for CUDR
- The HTML branch use the classe "members" with front end vanilla JS.

> To test the API i preconise to use postman for HTTP request.

---

## Project setup


### Compiles and hot-reloads for development with nodemon

```
# Install dependecies
npm install
# serve with hot reload at localhost:8080
npm run start
```

Find the api map with Swaggers at <localhost:8080/api/v1/api-docs/#/> 
and even test it from there.
<a><img src="https://i.imgur.com/vwcT4f5.png" title="c++ app made in qt" alt="docker container SQL"></a>



---

## Routes of the API


<a><img src="https://i.imgur.com/rj7G7eH.png" title="c++ app made in qt" alt="docker container SQL"></a>

---


### Structure of SingleFileCUDR


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

