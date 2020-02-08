# My advanced REST API NODEJS


---

### This repo is a training of API REST with express and body parser for my diploma project of  Higher Technical Certificate (BTS).



---

## Project setup
```
npm install
```
### Compiles and hot-reloads for development with nodemon
```
npm run start
```


### 1 - API REST SIMPLISTE





---

-The object of routes. This exemple show only for the specific ID



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


### 2 - ASYNC DATA

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
