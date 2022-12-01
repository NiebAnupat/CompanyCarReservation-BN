const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const login = async (req, res) => {
    console.log('GET /api/login')
    console.log(req.body)

    const { EM_ID, EM_ID_CARD } = req.body

    try {
            const user = await prisma.employee.findUnique({
            where: {
                EM_ID: parseInt(EM_ID),
            },
        })
        console.log(user)
        if (user) {
            if (user.EM_ID_CARD == EM_ID_CARD) {
                res.json(user)
                res.status(200)
                console.log('Login Successful')
                res.end()
            } else {
                res.json({ message: 'Incorrect Password' })
                res.status(400)
                console.log('Incorrect Password')
                res.end()
            }
        } else {
            res.json({ message: 'User not found' })
            res.status(400)
            console.log('User not found')
            res.end()
        } }catch ( e ) {

    }


}

module.exports = {
    login
}


