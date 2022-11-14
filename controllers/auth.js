const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const login = async (req, res) => {
    console.log('GET /api/login')

    console.log(req.body.username)
    console.log(req.body.password)

    const { username, password } = req.body

    res.json({
        message: `Hello ${username} Password : ${password}`
    })
}

module.exports = {
    login
}


