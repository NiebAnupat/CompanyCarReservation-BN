const { PrismaClient } = require( '@prisma/client' )
const prisma = new PrismaClient()

const getCars = async ( req, res ) => {
    console.log( 'GET /api/cars' )
    const cars = await prisma.car.findMany()
    res.json( cars )
}

const getCar = async ( req, res ) => {
    console.log( 'GET /api/cars/:id' )
    const car = await prisma.car.findUnique( {
        where : {
            C_ID : parseInt( req.params.id )
        }
    } )
    res.json( car )
}

const createCar = async ( req, res ) => {
    console.log( 'POST /api/cars' )
    const car = await prisma.car.create( {
        data : {
            C_NAME : req.body.C_NAME,
            C_DESCRIPTION : req.body.C_DESCRIPTION,
            C_LEVEL : parseInt( req.body.C_LEVEL ),
            C_PRICE : req.body.C_PRICE,
            C_DESCRIPTION : req.body.C_DESCRIPTION
        }
    } )
    res.json( car )
}

const updateCar = async ( req, res ) => {
    console.log( 'PUT /api/cars/:id' )
    const car = await prisma.car.update( {
        where : {
            C_ID : parseInt( req.params.id )
        },
        data : {
            C_NAME : req.body.C_NAME,
            C_DESCRIPTION : req.body.C_DESCRIPTION,
            C_LEVEL : parseInt( req.body.C_LEVEL ),
        }
    } )
    res.json( car )
}

const deleteCar = async ( req, res ) => {
    console.log( 'DELETE /api/cars/:id' )
    const car = await prisma.car.delete( {
        where : {
            C_ID : parseInt( req.params.id )
        }
    } )
    res.json( car )
}

module.exports = {
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar
}
