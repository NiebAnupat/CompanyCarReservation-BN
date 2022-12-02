const { PrismaClient } = require( "@prisma/client" );
const moment = require( "moment" );
const fs = require( "fs" );
const prisma = new PrismaClient();

const getReservations = async ( req, res ) => {
    const emId = parseInt( req.params.EM_ID );
    console.log( "GET /api/reservations EM_ID: ", emId );
    try {
        const reservations = await prisma.reservation.findMany( {
            where : {
                EM_ID : emId,
            },
            include : {
                car : true,
            },
            orderBy : {
                R_ID : "desc",
            }
        } );
        res.json( reservations );
        res.status( 200 );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
};

const getReservation = async ( req, res ) => {
    const reservationId = parseInt( req.params.id );
    console.log( "GET /api/reservations/: ", reservationId );
    try {
        const reservation = await prisma.reservation.findUnique( {
            where : {
                R_ID : reservationId,
            },
        } );
        res.json( reservation );
        res.status( 200 );
        console.log( "Sent reservation" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
};

const getRecentReservations = async ( req, res ) => {

    const emId = parseInt( req.params.EM_ID );
    console.log( "GET /api/reservations/recent : ", emId );
    try {
        const reservations = await prisma.reservation.findMany( {
            where : {
                EM_ID : emId,
            },
            take : 10,
            orderBy : {
                R_ID : "desc",
            },
        } );
        res.json( reservations );
        res.status( 200 );
        console.log( "Sent recent reservations" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not found" } );
        res.status( 400 );
        res.end();
    }
}

const getLatestReservation = async ( req, res ) => {
    const emId = parseInt( req.params.EM_ID );
    console.log( "GET /api/reservations/latest" );
    try {
        const reservation = await prisma.reservation.findFirst( {
            where : {
                EM_ID : emId,
                R_IS_RETURN : false,
            },
            include : {
                car : true,
            },
            orderBy : {
                R_ID : "desc",
            }
        } );
        res.json( reservation );
        res.status( 200 );
        console.log( "Sent latest reservation" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
};


const getPendingReservations = async ( req, res ) => {
    console.log( "GET /api/reservations/pending" );
    try {
        const reservations = await prisma.reservation.findMany( {
            where : {
                R_STATUS : "P",
            },
            include : {
                employee : true,
                car : true,
            }
        } );
        res.json( reservations );
        res.status( 200 );
        console.log( "Sent reservations" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
}

const getReturnedReservations = async ( req, res ) => {
    console.log( "GET /api/reservations/returned" );
    try {
        const reservations = await prisma.reservation.findMany( {
            where : {
                R_IS_RETURN : true,
            },
            include : {
                employee : true,
                car : true,
            },
            orderBy : {
                R_ID : "desc",
            }
        } );
        res.json( reservations );
        res.status( 200 );
        console.log( "Sent reservations" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
}

const getMustReturnReservation = async ( req, res ) => {
    console.log( "GET /api/reservations/mustreturn" );
    const EM_ID = parseInt( req.params.EM_ID );
    try {
       const reservation = await prisma.reservation.findFirst( {
            where : {
                EM_ID : EM_ID,
                R_IS_RETURN : false,
                R_STATUS : "T",
            },
           orderBy : {
                R_ID : "desc",
           },
            include : {
                car : true,
            }
       } );
        res.json( reservation );
        res.status( 200 );
        console.log( "Sent count" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not found" } );
        res.status( 400 );
        res.end();
    }
}

const getCheckedReservations = async ( req, res ) => {
    console.log( "GET /api/reservations/checked" );
    try {
        const reservations = await prisma.reservation.findMany( {
            where : {
                NOT : {
                    R_STATUS : "P",
                }
            },
            include : {
                employee : true,
                car : true,
            },
            orderBy : {
                R_ID : "desc",
            }
        } );
        res.json( reservations );
        res.status( 200 );
        console.log( "Sent reservations" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
}

const getCountTodayReservations = async ( req, res ) => {
    console.log( "GET /api/reservations/count/today" );
    try {
        const reservations = await prisma.reservation.findMany( {
            where : {
                R_DATE_MAKE : {
                    gte : new Date( moment().format( 'YYYY-MM-DD' ) ),
                }
            },
        } );
        res.json( reservations.length );
        res.status( 200 );
        console.log( "Sent count" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not found" } );
        res.status( 400 );
        res.end();
    }
}

const getCountTodayPending = async ( req, res ) => {
    console.log( "GET /api/reservations/count/pending/today" );
    try {
        const reservations = await prisma.reservation.findMany( {
            where : {
                R_STATUS : "P",
                R_DATE_MAKE : {
                    gte : new Date( moment().format( 'YYYY-MM-DD' ) ),
                }
            },
        } );
        res.json( reservations.length );
        res.status( 200 );
        console.log( "Sent count" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not found" } );
        res.status( 400 );
        res.end();
    }
}

const getCountTodayCheck = async ( req, res ) => {
    console.log( "GET /api/reservations/count/check/today" );
    try {
        const reservations = await prisma.reservation.findMany( {
            where : {
                R_DATE_MAKE : {
                    gte : new Date( moment().format( 'YYYY-MM-DD' ) ),
                },
                NOT : {
                    R_STATUS : "P",
                }
            },

        } );
        res.json( reservations.length );
        res.status( 200 );
        console.log( "Sent count" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not found" } );
        res.status( 400 );
        res.end();
    }
}

const createReservation = async ( req, res ) => {
    const { R_DESCRIPTION, C_ID, R_TIME_BOOK, R_TIME_RETURN, EM_ID } = req.body;
    console.log( "POST /api/reservations" );
    console.log( C_ID );

    try {
        const reservation = await prisma.reservation.create( {
            data : {
                R_DESCRIPTION : R_DESCRIPTION,
                C_ID : parseInt( C_ID ),
                R_DATE_MAKE : new Date( moment().format( 'YYYY-MM-DD' ) ),
                R_TIME_BOOK : R_TIME_BOOK,
                R_TIME_RETURN : R_TIME_RETURN,
                EM_ID : parseInt( EM_ID ),
            },
        } );
        res.json( reservation );
        res.status( 200 );
        console.log( "Reservation created" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not created" } );
        res.status( 400 );
        res.end();
    }
};

const updateReservation = async ( req, res ) => {
    const { R_DESCRIPTION, C_ID, R_TIME_RETURN, EM_ID } = req.body;
    const R_ID = parseInt( req.params.id );
    console.log( "PUT /api/reservations/", R_ID );
    try {
        const reservation = await prisma.reservation.update( {
            where : {
                R_ID : R_ID,
            },
            data : {
                R_DESCRIPTION : R_DESCRIPTION,
                C_ID : parseInt( C_ID ),
                R_TIME_RETURN : R_TIME_RETURN,
                EM_ID : parseInt( EM_ID ),
            },
        } );
        res.json( reservation );
        res.status( 200 );
        console.log( "Reservation updated" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not updated" } );
        res.status( 400 );
        res.end();
    }
};

const approveReservation = async ( req, res ) => {
    const R_ID = parseInt( req.params.id );
    console.log( "PUT /api/reservations/approve/", R_ID );
    try {
        const reservation = await prisma.reservation.update( {
            where : {
                R_ID : R_ID,
            },
            data : {
                R_STATUS : "T",
            },
        } );
        res.json( reservation );
        res.status( 200 );
        console.log( "Reservation approved" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not approved" } );
        res.status( 400 );
        res.end();
    }
}

const rejectReservation = async ( req, res ) => {
    const R_ID = parseInt( req.params.id );
    console.log( "PUT /api/reservations/reject/", R_ID );
    try {
        const reservation = await prisma.reservation.update( {
            where : {
                R_ID : R_ID,
            },
            data : {
                R_STATUS : "F",
                R_IS_RETURN : true,
            },
        } );
        res.json( reservation );
        res.status( 200 );
        console.log( "Reservation rejected" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not rejected" } );
        res.status( 400 );
        res.end();
    }
}

const deleteReservation = async ( req, res ) => {
    const R_ID = parseInt( req.params.id );
    console.log( "DELETE /api/reservations/", R_ID );
    try {
        const reservation = await prisma.reservation.delete( {
            where : {
                R_ID : R_ID,
            },
        } );
        res.json( reservation );
        res.status( 200 );
        console.log( "Reservation deleted" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not deleted" } );
        res.status( 400 );
        res.end();
    }
};

const adminNote = async ( req, res ) => {
    const { R_ADMIN_NOTE } = req.body;
    const R_ID = parseInt( req.params.id );
    console.log( "PUT /api/reservations/admin-note/", R_ID );
    try {
        const reservation = await prisma.reservation.update( {
            where : {
                R_ID : R_ID,
            },
            data : {
                R_ADMIN_NOTE : R_ADMIN_NOTE,
            },
        } );
        res.json( reservation );
        res.status( 200 );
        console.log( "Reservation updated" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not updated" } );
        res.status( 400 );
        res.end();
    }
};

const returnReservation = async ( req, res ) => {
    const { R_ID, R_RETURN_NOTE, R_TIME_RETURNED } = req.body;
    console.log( "PUT /api/reservations/return/", R_ID );
    if ( req.file === undefined ) return res.status( 400 ).send( "กรุณาเพิ่มรูปภาพ" );
    const file = req.file;

    try {
        // calculate fine by date
        const reserv = await prisma.reservation.findUnique( {
            where : {
                R_ID : parseInt( R_ID ),
            }
        } );
        const date1 = new Date( reserv.R_TIME_RETURN );
        const date2 = new Date( R_TIME_RETURNED );
        const diffTime = Math.abs( date2 - date1 );
        var diffDays = Math.ceil( diffTime / (1000 * 60 * 60 * 24) );
        var fine = 0.0;

        // if time almost day then add 1 day
        if ( diffTime % (1000 * 60 * 60 * 24) > 0 ) diffDays += 1;

        if ( diffDays > 0 ) fine = diffDays * 100;
        console.log( "fine: ", fine );

        const reservation = await prisma.reservation.update( {
            where : {
                R_ID : parseInt( R_ID ),
            },
            data : {
                R_TIME_RETURNED : new Date().toISOString(),
                R_IS_RETURN : true,
                R_RETURN_NOTE : R_RETURN_NOTE,
                R_RETURN_IMG : fs.readFileSync(
                    __basedir + "/assets/uploads/" + file.filename
                ),
                R_FINE : fine,
                employee : {}
            },
            include : {
                employee : true,
            },
        } );
        res.json( reservation );
        res.status( 200 );
        console.log( "Reservation returned" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Reservation not returned" } );
        res.status( 400 );
        res.end();
    }
}

module.exports = {
    getReservations,
    getReservation,
    getRecentReservations,
    getLatestReservation,
    getPendingReservations,
    getReturnedReservations,
    getMustReturnReservation,
    getCheckedReservations,
    getCountTodayReservations,
    getCountTodayPending,
    getCountTodayCheck,
    createReservation,
    updateReservation,
    approveReservation,
    rejectReservation,
    deleteReservation,
    adminNote,
    returnReservation
};
