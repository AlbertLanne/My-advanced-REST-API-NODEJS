// Modules
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')('dev')
const axios = require('axios')
//Variables globales
const app = express()
const port = 8081
const twig = require('twig')

// Middlewares
app.use(morgan)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./assets/swagger.json')

const config = require('../assets/classes/config')
const fetch = axios.create({
    baseURL : 'http://localhost:8080/api/v1'
})



// Page d'accueil
app.get('/', (req, res) => {
    res.redirect('/members')
})



app.get('/members', (req,res)=>{
    fetch.get('/members')
            .then((response)=>{

                if(response.data.status == 'success') {
                    res.render('members.twig',{
                        members : response.data.result})
                } else {
                    renderError(res, response.data.message)
                }
        })
            .catch((err)=>renderError(res,err.message))

})


// Lancement de l'application
app.listen(port, ()=>  console.log('started on port ' + port))


// Fonctions

function renderError(res, errMsg){
    res.render('error.twig',{
        errorMsg : errMsg
    })
}









// mysql.createConnection({
//     host: config.db.host,
//     database: config.db.database,
//     user: config.db.user,
//     password: config.db.password
//
//
// }).then((db)=> {
//
//     console.log('Connected.')
//
//     const app = express()
//
//     let MembersRouter = express.Router()
//     let Members = require('./assets/classes/members-class')(db, config)
//     console.log(Members)
//
//
//
//     // SWAGGERS  http://localhost:8080/api/v1/api-docs/#/
//     app.use(config.rootAPI + 'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//
//
//     MembersRouter.route('/:id')
//
//         // Récupère un membre avec son ID
//
//         .get(async (req, res) => {
//             let member = await Members.getById(req.params.id)
//             res.json(checkAndchange(member))
//         })
//
//         // Modifie un membre avec ID
//         .put(async(req, res) => {
//             let updateMember = await Members.update(req.params.id, req.body.name)
//             res.json(checkAndchange(updateMember))
//         })
//
//         // Supprime un membre avec ID
//         .delete(async (req, res) => {
//             let deleteMember = await Members.delete(req.params.id)
//             res.json(checkAndchange(deleteMember))
//         })
//
//     MembersRouter.route('/')
//
//         // Récupère tous les membres
//         .get(async (req, res) => {
//            let allMembers = await Members.getAll(req.query.max)
//             res.json(checkAndchange((allMembers)))
//         })
//
//         // Ajoute un membre avec son nom
//         .post(async (req, res) => {
//             let addMember = await Members.add(req.body.name)
//             res.json(checkAndchange(addMember))
//         })
//
//     app.use(config.rootAPI+'members', MembersRouter)
//
//
//
//
// }).catch((err)=>{
//     console.log('Error During database connection')
//     console.log(err.message)
// })
