const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
// const func = require('functions')
const {success,error} = require('./functions')
const config = require('./config')

const mysql = require('mysql')
const db = mysql.createConnection(process.env.DATABASE_URL);
db.connect((err) => {
    if (err)
        console.log(err.message)
    else{
        console.log('connected')

    }

})
/**
const members = [
    {
        id: 1,
        name: 'Clement'
    },
    {
        id: 2,
        name: 'Julien'
    },
    {
        id: 3,
        name: 'Albert'
    }
]
*/

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));

let MembersRouter = express.Router()

MembersRouter.route('/:id')
            // Recupere membre avec sont ID
        .get((req,res)=> {
            let index = getIndex(req.params.id);

            if (typeof(index) == 'string'){
                res.json(error(index))
            }else{
                res.json(success(members[index]))
            }
            res.json(success(members[(req.params.id)-1].name))
        })
            // modifie
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
            // Supprime membre avec sont ID
        .delete((req,res)=> {

            let index = getIndex(req.params.id);

            if (typeof(index) == 'string'){
                res.json(error(index))
            } else {
                members.splice(index, 1)
                res.json(success(members))
            }
        })


MembersRouter.route('/')

            // recupere tout les membres
        .get((req,res)=> {
            if (req.query.max != undefined){
                res.json(success(members.slice(0,req.query.max)))
            }else {
                res.json(success(members))
            }
        })
            // ajoute un membre
        .post((req,res)=>{
            if(req.body.name){
                let sameName = false
                for (  let i =0; i < members.length; i++ ){
                    if (members[i].name == req.body.name){
                        sameName = true
                        break
                    }
                }
                if (sameName){
                    res.json(error('name already taken'))
                }else {
                    let member ={
                        id: createID(),
                        name: req.body.name
                    }
                    members.push(member)
                    res.json(success(member))
                }
            } else {
                res.join(error('no name value'))
            }
        })


app.use(config.rootAPI+'members', MembersRouter)
app.listen(config.port, () => console.log('Started on port'+config.port))

function getIndex(id) {
    for (let i = 0; i < members.length; i++){
        if (members[i].id == id)
            return i
    }
    return 'wrong id'
}
// La petite fonction qui recup le dernier id pour rajouet 1
function createID() {
    return members[members.length-1].id+1
}

