import users from '../database/users.json'

function login(req, res) {
    document.getElementsByName('response').values(res.send(JSON.stringify(users)))
}