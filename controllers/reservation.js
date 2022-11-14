const { PrismaClient } = require( '@prisma/client' )
const prisma = new PrismaClient()

const getReservations = async ( req, res ) => {
    console.log( 'GET /api/reservations' )
    const reservations = await prisma.reservation.find(
        {
            where : {
                EM_ID : parseInt( req.params.id )
            }
        }
    )
    res.json( reservations )
};

const getReservation = async ( req, res ) => {
    console.log( 'GET /api/reservations/:id' )
    const reservation = await prisma.reservation.findUnique( {
        where : {
            R_ID : parseInt( req.params.id )
        }
    } )
    res.json( reservation )
}

const getLatestReservation = async ( req, res ) => {
    console.log( 'GET /api/reservations/latest' )
    const reservation = await prisma.reservation.findFirst( {
        orderBy : {
            R_ID : 'desc'
        }
    } )
    res.json( reservation )
}

const createReservation = async ( req, res ) => {
    console.log( 'POST /api/reservations' )
    const reservation = await prisma.reservation.create( {
        data : {
            R_DESCRIPTION : req.body.R_DESCRIPTION,
            C_ID : parseInt( req.body.C_ID ),
            R_TIME_RETURN : req.body.R_TIME_RETURN,
            EM_ID : req.body.EM_ID,
        }
    } )
    res.json( reservation )
}

const updateReservation = async ( req, res ) => {
    console.log( 'PUT /api/reservations/:id' )
    const reservation = await prisma.reservation.update( {
        where : {
            R_ID : parseInt( req.params.id )
        },
        data : {
            R_DESCRIPTION : req.body.R_DESCRIPTION,
            C_ID : parseInt( req.body.C_ID ),
            R_TIME_RETURN : req.body.R_TIME_RETURN,
            EM_ID : req.body.EM_ID,
        }
    } )
    res.json( reservation )
}

const deleteReservation = async ( req, res ) => {
    console.log( 'DELETE /api/reservations/:id' )
    const reservation = await prisma.reservation.delete( {
        where : {
            R_ID : parseInt( req.params.id )
        }
    } )
    res.json( reservation )
}

module.exports = {
    getReservations,
    getReservation,
    getLatestReservation,
    createReservation,
    updateReservation,
    deleteReservation,
}

