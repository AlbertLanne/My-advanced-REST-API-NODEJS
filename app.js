const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const func = require('functions')

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

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));

app.get('/api/v1/members/:id', (req,res)=> {res.json(func.success(members[(req.params.id)-1].name))})
app.get('/api/v1/members', (req,res)=> {
    if (req.query.max != undefined){
        res.json(func.success(members.slice(0,req.query.max)))
    }else {
        res.json(func.success(members))
    }
})


app.post('/api/v1/members',(req,res)=>{
    if(req.body.name){

        let sameName = false
        for (  let i =0; i < members.length; i++ ){
            if (members[i].name == req.body.name){
                sameName = true
                break
            }
        }

        if (sameName){
            res.json(func.error('name already taken'))

        }else {
            let member ={
                id: members.length+1,
                name: req.body.name
            }
            members.push(member)
            res.json(func.success(member))
        }



    } else {
        res.join(func.error('no name value'))
    }
})



app.listen(8080, () => console.log('Started on port 8080'))
// function success(result){
//     return {
//         status: 'success',
//         result: result
//     }
// }
// function error(message){
//     return {
//         status: 'message',
//         result: error
//     }
// }
