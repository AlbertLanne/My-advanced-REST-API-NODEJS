// Modules
require('babel-register')
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')('dev')
const axios = require('axios')
const twig = require('twig')

// Variables globales
const app = express()
const port = 8081
const fetch = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});

// Middlewares
app.use(morgan)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes

// Page d'accueil
app.get('/', (req, res) => {
    res.redirect('/members')
})

// Page récupérant tous les membres
app.get('/members', (req, res) => {
    apiCall(req.query.max ? '/members?max='+req.query.max : '/members', 'get', {}, res, (result) => {
        res.render('members.twig', {
            members: result
        })
    })
})

// Page récupérant un membre en fonction de son ID
app.get('/members/:id', (req, res) => {
    apiCall('/members/'+req.params.id, 'get', {}, res, (result) => {
        res.render('member.twig', {
            member: result
        })
    })
})


// Page gérant la modification d'un membre
app.get('/edit/:id', (req, res) => {
    apiCall('/members/'+req.params.id, 'get', {}, res, (result) => {
        res.render('edit.twig', {
            member: result
        })
    })
})

// Méthode permettant de modifier un membre
app.post('/edit/:id', (req, res) => {
    apiCall('/members/'+req.params.id, 'put', {
        name: req.body.name
    }, res, () => {
        res.redirect('/members')
    })
})

// Méthode permettant de supprimer un membre
app.post('/delete', (req, res) => {
    apiCall('/members/'+req.body.id, 'delete', {}, res, () => {
        res.redirect('/members')
    })
})

// Page gérant l'ajout d'un membre
app.get('/insert', (req, res) => {
    res.render('insert.twig')
})

// Méthode permettant d'ajouter un membre
app.post('/insert', (req, res) => {
    apiCall('/members', 'post', {name: req.body.name}, res, () => {
        res.redirect('/members')
    })
})


// Lancement de l'application
app.listen(port, () => console.log('Started on port ' + port))

// Fonctions

function renderError(res, errMsg) {
    res.render('error.twig', {
        errorMsg: errMsg
    })
}

function apiCall(url, method, data, res, next) {
    fetch({
        method: method,
        url: url,
        data: data
    }).then((response) => {
        if (response.data.status == 'success') {
            next(response.data.result)
        } else {
            renderError(res, response.data.message)
        }
    })
        .catch((err) => renderError(res, err.message))
}
