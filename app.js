const {checkAndchange} = require('./assets/classes/functions')
const mysql = require('promise-mysql')

const bodyParser = require('body-parser')

const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./assets/swagger.json')

const morgan = require('morgan')
const config = require('./assets/classes/config')


mysql.createConnection({
    host: config.db.host,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password


}).then((db)=> {

    console.log('Connected.')

    const app = express()

    let MembersRouter = express.Router()
    let Members = require('./assets/classes/members-class')(db, config)
    console.log(Members)

    app.use(morgan('dev'))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    // SWAGGERS  http://localhost:8080/api/v1/api-docs/#/
    app.use(config.rootAPI + 'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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

    MembersRouter.route('/')

        // Récupère tous les membres
        .get(async (req, res) => {
           let allMembers = await Members.getAll(req.query.max)
            res.json(checkAndchange((allMembers)))
        })

        // Ajoute un membre avec son nom
        .post(async (req, res) => {
            let addMember = await Members.add(req.body.name)
            res.json(checkAndchange(addMember))
        })

    app.use(config.rootAPI+'members', MembersRouter)

    app.listen(config.port, () => console.log('Started on port '+config.port))



}).catch((err)=>{
    console.log('Error During database connection')
    console.log(err.message)
})
