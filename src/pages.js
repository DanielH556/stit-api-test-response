const { query } = require("express");

function loginPage(req, res) {
    return res.render("startSession.html")
}

function productPage(req, res) {
    return res.render("productsDisplay.html")
}

function landingPage(req, res) {
    return res.render("index.html")
}

function pages(req, res) {
    try {
        let querystring = ":" + req.body.email;
        querystring += "?tags=" + req.body.tags;
        return res.redirect("/products/" + querystring + "productsDisplay.html")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    loginPage,
    productPage,
    landingPage,
    pages
}