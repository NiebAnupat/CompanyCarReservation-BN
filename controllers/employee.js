const employeeObj = require( "../models/employee.js" );
const { PrismaClient } = require( "@prisma/client" );
const prisma = new PrismaClient();

const login = async ( req, res ) => {
    console.log( "GET /api/login" );

    const { emId, cardId } = req.body;
    try {
        const employee = await prisma.employee.findUnique( {
            where : {
                EM_ID : emId,
            },
        } );
        if ( employee.EM_CARD_ID === cardId ) {
            res.status( 200 );
            res.end( true );
        } else {
            res.json( { message : "Login failed" } );
            res.status( 400 );
            res.end( false );
        }

    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
};

const getEmployee = async ( req, res ) => {
    const emId = parseInt( req.body.id );
    console.log( "GET /api/employee : " + emId );
    try {
        const employee = await prisma.employee.findUnique( {
            where : {
                EM_ID : emId,
            },
            include : {
                department : true,
                position : true,
                favorite : {
                    include : {
                        car : {
                            include : {
                                car_img : true,
                            },
                        },
                    },
                },
            },
        } );
        res.json( employee );
        res.status( 200 );
        console.log( "Employee found" );
        res.end();
    } catch ( error ) {
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
};

const addFavoriteCar = async ( req, res ) => {
    const emId = parseInt( req.params.id );
    const C_ID = parseInt( req.body.C_ID );
    console.log(
        "POST /api/employee/:id/favorite : " + `EM :  ${ emId } Car :  ${ C_ID }`
    );
    try {
        const isExit = await prisma.favorite.findFirst( {
            where : {
                EM_ID : emId,
                C_ID : C_ID,
            },
        } );
        if ( isExit ) {
            res.json( { message : "This car is already in your favorite list." } );
            res.status( 400 );
            res.end();
        } else {
            const favorite = await prisma.favorite.create( {
                data : {
                    C_ID : C_ID,
                    EM_ID : emId,
                },
            } );
            res.json( favorite );
            res.status( 200 );
            console.log( "Favorite added" );
            res.end();
        }
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
};

const getFavoriteCars = async ( req, res ) => {
    const emId = parseInt( req.params.id );
    console.log( `GET /api/employee/${ emId }/favorite` );
    try {
        const favorites = await prisma.favorite.findMany( {
            where : {
                EM_ID : emId,
            },
        } );
        res.json( favorites );
        res.status( 200 );
        console.log( "Favorite found" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
};

const deleteFavoriteCar = async ( req, res ) => {
    const emId = parseInt( req.params.id );
    const C_ID = parseInt( req.body.C_ID );
    console.log( "DELETE /api/employee/:id/favorite/:id" );
    try {
        const favorite = await prisma.favorite.deleteMany( {
            where : {
                C_ID : C_ID,
                EM_ID : emId,
            },
        } );
        res.json( favorite );
        res.status( 200 );
        console.log( "Favorite deleted" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Favorite not found" } );
        res.status( 400 );
        res.end();
    }
};

const getFine = async ( req, res ) => {
    console.log( "GET /api/employee/:id/fine" );
    try {
        const employee = await prisma.employee.findUnique( {
            where : {
                EM_ID : parseInt( req.params.id ),
            },
        } );
        const fine = employee.EM_FINE;
        res.json( fine );
        res.status( 200 );
        console.log( "Sended fine" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
};

const updateFine = async ( req, res ) => {
    const emId = parseInt( req.params.id );
    const fine = parseInt( req.body.fine );
    console.log( "PUT /api/employee/:id/fine : ", emId );
    try {
        const employee = await prisma.employee.update( {
            where : {
                EM_ID : emId,
            },
            data : {
                EM_FINE : fine,
            },
        } );
        res.json( employee );
        res.status( 200 );
        console.log( "Fine updated" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
};

const addFine = async ( req, res ) => {
    const emId = parseInt( req.params.id );
    const fine = parseInt( req.body.fine );
    console.log( "PUT /api/employee/:id/fine : ", emId );
    try {
        const employee = await prisma.employee.findUnique( {
            where : {
                EM_ID : emId,
            },
        } );
        const newFine = employee.EM_FINE + fine;
        const updatedEmployee = await prisma.employee.update( {
            where : {
                EM_ID : emId,
            },
            data : {
                EM_FINE : newFine,
            },
        } );
        res.json( updatedEmployee );
        res.status( 200 );
        console.log( "Fine updated" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
};

const subtractFine = async ( req, res ) => {
    const emId = parseInt( req.params.id );
    const fine = parseInt( req.body.fine );
    console.log( "PUT /api/employee/:id/fine : ", emId );
    try {
        const employee = await prisma.employee.findUnique( {
            where : {
                EM_ID : emId,
            },
        } );
        const newFine = employee.EM_FINE - fine;
        const updatedEmployee = await prisma.employee.update( {
            where : {
                EM_ID : emId,
            },
            data : {
                EM_FINE : newFine,
            },
        } );
        res.json( updatedEmployee );
        res.status( 200 );
        console.log( "Fine updated" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
};

module.exports = {
    login,
    getEmployee,
    addFavoriteCar,
    getFavoriteCars,
    deleteFavoriteCar,
    getFine,
    updateFine,
    addFine,
    subtractFine,
};
