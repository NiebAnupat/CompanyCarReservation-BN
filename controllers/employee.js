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

const getEmployee = async (req, res) => {
    console.log('GET /api/employee')
    const employee = await prisma.employee.findUnique({
        where: {
            EM_ID: parseInt(req.params.id)
        }
    })
    res.json(employee)
}

const addFavoriteCar = async (req, res) => {
    console.log('POST /api/employee/:id/favorite')
    const favorite = await prisma.favorite.create({
        data: {
            C_ID: parseInt(req.body.C_ID),
            EM_ID: parseInt(req.params.id)
        }
    })
    res.json(favorite)
}

const getFavoriteCars = async (req, res) => {
    console.log('GET /api/employee/:id/favorite')
    const favorites = await prisma.favorite.findMany({
        where: {
            EM_ID: parseInt(req.params.id)
        }
    })
    res.json(favorites)
}

const deleteFavoriteCar = async (req, res) => {
    console.log('DELETE /api/employee/:id/favorite/:id')
    const favorite = await prisma.favorite.delete({
        where: {
            F_ID: parseInt(req.params.id)
        }
    })
    res.json(favorite)
}

const getFine = async (req, res) => {
    console.log('GET /api/employee/:id/fine')
    const employee = await prisma.employee.findUnique({
        where: {
            EM_ID: parseInt(req.params.id)
        }
    })
    const fine = employee.EM_FINE
    res.json(fine)
}

module.exports = {
    login,
    getEmployee,
    addFavoriteCar,
    getFavoriteCars,
    deleteFavoriteCar,
    getFine
}


