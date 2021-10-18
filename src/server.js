const express = require('express')
const srv = express()
const fs = require('fs')
const nj = require('nunjucks')
const {loginPage, productPage, landingPage, pages} = require('./pages')
const users = require('../database/users.json')
const org = require('../database/organization.json')

const activeUser = {
    "email": "",
    "roles": "",
    "departments": []
}

nj.configure('src/pages', {
    express: srv,
    noCache: true,
})


srv.use(express.urlencoded({ extended: true }))
.use(express.json())
.get("/", landingPage)
.get("/login", loginPage)
.get("/products", function(req, res) {
    console.log(activeUser.roles)
    if (activeUser.roles == 'middle') {
        for (var c = 0; c < org.length; c++) {
            if (org[c].level == 1 || org[c].level == 2) {
                activeUser.departments += org[c].name + ", "
                console.log(org[c].name)
            }
        }
    }else if (activeUser.roles == 'junior') {
        for (var c = 0; c < org.length; c++) {
            if (org[c].level == 2) {
                activeUser.departments += org[c].name + ", "
                console.log(org[c].name)
            }
        }
    }else if (activeUser.roles == 'senior') {
        for (var c = 0; c < org.length; c++) {
            if (org[c].level == 0 || org[c].level == 1 || org[c].level == 2) {
                activeUser.departments += org[c].name + ", "
                console.log(org[c].name)
            }
        }
    }else if (activeUser.roles == 'intern') {
        for (var c = 0; c < org.length; c++) {
            if (org[c].level == 2 || org[c].level == 0 || org[c].level == 0 && org[c].name == "STUFF A") {
                activeUser.departments += org[c].name + ", "
                console.log(org[c].name)
            }
        }
    }
    console.log(activeUser)
    return res.send(activeUser)
})
.listen(3000)

srv.post('/login', function(req, res) {
    console.log(req.body)
    var email = JSON.stringify(req.body.email)
    var senha = JSON.stringify(req.body.senha)
    console.log("Email: "+email)
    console.log("Senha: "+senha)
    for (var i=0; i<users.length; i++) {
        if (JSON.parse(email) == users[i].email) {
            console.log(users[i].roles)
            activeUser.roles = users[i].roles
            activeUser.email = users[i].email
            res.setHeader('Content-type', 'text/json')
            res.redirect('/products')
            break
        }else {
            console.log('else reached')
        }
    }
    res.send('for finished')

})