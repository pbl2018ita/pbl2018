var express = require('express')
var faker = require('faker')
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts')
var app = express()
var port = process.env.PORT || 8080; 



 
app.set('view engine', 'ejs')    // Setamos que nossa engine será o ejs
app.use(expressLayouts)          // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(bodyParser.urlencoded()) // Com essa configuração, vamos conseguir parsear o corpo das requisições
 


 
app.get('/', (req, res) => {
    res.render('pages/home')
  })

app.get('/about', (req, res) => {
var users = [{
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: 'http://placekitten.com/300/300'
}, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: 'http://placekitten.com/400/300'
}, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: 'http://placekitten.com/500/300'
}]

res.render('pages/about', { usuarios: users })
})
   

app.get('/contact', (req, res) => {
    res.render('pages/contact')
})
app.get('/medico', (req, res) => {
    res.render('pages/medico')
})
app.get('/paciente', (req, res) => {
    res.render('pages/paciente')
})

app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard')
})
app.get('/ocorrencia', (req, res) => {
    res.render('pages/ocorrencia')
})
app.get('/tempo', (req, res) => {
    res.render('pages/tempo')
})



 
  app.post('/contact', (req, res) => {
    res.send('Obrigado por entrar em contato conosco, ' + req.body.name + '! Responderemos em breve!')
  })

app.use(express.static(__dirname + '/public'))
app.listen(port)
console.log('Servidor iniciado em http://localhost:' + port)
   