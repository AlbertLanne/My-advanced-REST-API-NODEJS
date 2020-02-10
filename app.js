const {success, error} = require('./functions')
const mysql = require('mysql')

const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const config = require('./config')


const db = mysql.createConnection({
    host: 'bfgvnm6ajhbocjxbjmly-mysql.services.clever-cloud.com',
    database: 'bfgvnm6ajhbocjxbjmly',
    user: 'uisomclwcgug5cj5',
    password: '58Eg8vzqeQ4Rx0zxjhFw'
})

db.connect((err) => {

    if (err)
        console.log(err.message)
    else {
        console.log('Connected.')

        const app = express()

        let MembersRouter = express.Router()

        app.use(morgan('dev'))
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        MembersRouter.route('/:id')

            // Récupère un membre avec son ID
            .get((req, res) => {

                db.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {

                        if (result[0] != undefined) {
                            res.json(success(result[0]))
                        } else {
                            res.json(error('Wrong id'))
                        }

                    }
                })

            })

            // Modifie un membre avec ID
            .put((req, res) => {

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
            .get((req, res) => {
                if (req.query.max != undefined && req.query.max > 0) {

                    db.query('SELECT * FROM members LIMIT 0, ?', [req.query.max], (err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {
                            res.json(success(result))
                        }
                    })

                } else if (req.query.max != undefined) {
                    res.json(error('Wrong max value'))
                } else {

                    db.query('SELECT * FROM members', (err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {
                            res.json(success(result))
                        }
                    })

                }
            })

            // Ajoute un membre avec son nom
            .post((req, res) => {

                if (req.body.name) {

                    db.query('SELECT * FROM members WHERE name = ?', [req.body.name], (err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {

                            if (result[0] != undefined) {
                                res.json(error('name already taken'))
                            } else {

                                db.query('INSERT INTO members(name) VALUES(?)', [req.body.name], (err, result) => {
                                    if (err) {
                                        res.json(error(err.message))
                                    } else {

                                        db.query('SELECT * FROM members WHERE name = ?', [req.body.name], (err, result) => {

                                            if (err) {
                                                res.json(error(err.message))
                                            } else {
                                                res.json(success({
                                                    id: result[0].id,
                                                    name: result[0].name
                                                }))
                                            }

                                        })

                                    }
                                })

                            }

                        }
                    })

                } else {
                    res.json(error('no name value'))
                }

            })

        app.use(config.rootAPI+'members', MembersRouter)

        app.listen(config.port, () => console.log('Started on port '+config.port))

    }

})
