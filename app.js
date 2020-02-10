const {success, error,checkAndchange} = require('./assets/classes/functions')
const mysql = require('promise-mysql')

const bodyParser = require('body-parser')
const express = require('express')
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
    app.use(bodyParser.urlencoded({ extended: true }));

    MembersRouter.route('/:id')

        // Récupère un membre avec son ID

        .get(async (req, res) => {
            let member = await Members.getById(req.params.id)
            res.json(checkAndchange(member))
        })

        // Modifie un membre avec ID
        .put(async(req, res) => {

            if (req.body.name) {

                db.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {

                        if (result[0] != undefined) {

                            db.query('SELECT * FROM members WHERE name = ? AND id != ?', [req.body.name, req.params.id], (err, result) => {
                                if (err) {
                                    res.json(error(err.message))
                                } else {

                                    if (result[0] != undefined) {
                                        res.json(error('same name'))
                                    } else {

                                        db.query('UPDATE members SET name = ? WHERE id = ?', [req.body.name, req.params.id], (err, result) => {
                                            if (err) {
                                                res.json(error(err.message))
                                            } else {
                                                res.json(success(true))
                                            }
                                        })

                                    }

                                }
                            })

                        } else {
                            res.json(error('Wrong id'))
                        }

                    }
                })

            } else {
                res.json(error('no name value'))
            }

        })

        // Supprime un membre avec ID
        .delete((req, res) => {

            db.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, result) => {
                if (err) {
                    res.json(error(err.message))
                } else {

                    if (result[0] != undefined) {

                        db.query('DELETE FROM members WHERE id = ?', [req.params.id], (err, result) => {
                            if (err) {
                                res.json(error(err.message))
                            } else {
                                res.json(success(true))
                            }
                        })

                    } else {
                        res.json(error('Wrong id'))
                    }

                }
            })

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
