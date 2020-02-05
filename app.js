const express = require('express')
const app = express()


app.use((req,res,next)=>{
    console.log(' L\'URL utilisé est la suivante : ' + req.url)
    next()
})

app.get('/api',(req,res) => {
    res.send('ROOT DE L\'API')
})

app.get('/api/v1',(req,res) => {
    res.send('API VERSION 1')
})

app.get('/api/v1/books/:id',(req,res) => {
    res.send(req.params)
})



app.listen(8080, () => console.log('Started on port 8080'))
