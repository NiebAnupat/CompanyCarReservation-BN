const { PrismaClient, payment } = require( "@prisma/client" );
const moment = require( "moment" );
const fs = require( "fs" );
const prisma = new PrismaClient();

const getPayments = async ( req, res ) => {
    console.log( req.params );
    const emId = parseInt( req.params.EM_ID );
    console.log( "GET /api/payments EM_ID: ", emId );
    try {
        const payments = await prisma.payment.findMany( { } );
        res.json( payments );
        res.status( 200 );
        console.log( "Sent payments" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
}

const getPayment = async ( req, res ) => {
    const paymentId = parseInt( req.params.id );
    console.log( "GET /api/payments/: ", paymentId );
    try {
        const payment = await prisma.payment.findUnique( {
            where : {
                PM_ID : paymentId,
            },
        } );
        res.json( payment );
        res.status( 200 );
        console.log( "Sent payment" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
}

const getPendingPayments = async ( req, res ) => {
    console.log( "GET /api/payments/pending" );
    try {
        const payments = await prisma.payment.findMany( {
            where : {
                PM_STATUS : "P",
            },
        } );
        res.json( payments );
        res.status( 200 );
        console.log( "Sent pending payments" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
}

const getCountTodayPayments = async ( req, res ) => {
    console.log( "GET /api/payments/today/count/" );
    try {

        const payments = await prisma.payment.findMany( {
            where : {
                PM_TIME : {
                    gte : new Date(moment().format( "YYYY-MM-DD" )),
                }
            }
        })

        res.json( payments.length );
        res.status( 200 );
        console.log( "Sent pending payment count" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
}

const getCountTodayCheckedPayment = async ( req, res ) => {
    console.log( "GET /api/payments/count/today" );
    try {

        const payments = await prisma.payment.findMany( {
            where : {
                PM_TIME : {
                    gte : new Date(moment().format( "YYYY-MM-DD" )),
                },
                PM_STATUS : "T"
            }
        })

        res.json( payments.length );
        res.status( 200 );
        console.log( "Sent today checked payments count" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
}

const createPayment = async ( req, res ) => {
    const { EM_ID, PM_AMOUNT, PM_TIME, PM_NOTE } = req.body;
    const file = req.file;
    console.log( "POST /api/payments" );
    try {
        const newPayment = await prisma.payment.create( {
            data : {
                EM_ID : parseInt( EM_ID ),
                PM_AMOUNT : parseInt( PM_AMOUNT ),
                PM_TIME : PM_TIME,
                PM_NOTE : PM_NOTE,
                PM_IMG : fs.readFileSync(
                    __basedir + "/assets/uploads/" + file.filename
                ),
            },
        } );
        res.json( newPayment );
        res.status( 200 );
        console.log( "Created payment" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Employee not found" } );
        res.status( 400 );
        res.end();
    }
}

const approvePayment = async ( req, res ) => {
    const paymentId = parseInt( req.params.id );
    console.log( "PUT /api/payments/: ", paymentId );
    try {
        const payment = await prisma.payment.update( {
            where : {
                PM_ID : paymentId,
            },
            data : {
                PM_STATUS : "T",
            },
        } );


        // update employee fine
        const { EM_ID, PM_AMOUNT } = payment;
        const employee = await prisma.employee.findUnique( {
            where : {
                EM_ID : EM_ID,
            }
        })
        const { EM_FINE } = employee;
        const newFine = EM_FINE - PM_AMOUNT;
        await prisma.employee.update( {
            where : {
                EM_ID : EM_ID,
            },
            data : {
                EM_FINE : newFine,
            }
        })
        res.status( 200 );
        res.json( {
            isApproved : true,
        } );
        console.log( "Approved payment" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Payment not found" } );
        res.status( 400 );
        res.end();
    }
}

const rejectPayment = async ( req, res ) => {
    const paymentId = parseInt( req.params.id );
    console.log( "PUT /api/payments/: ", paymentId );
    try {
        const payment = await prisma.payment.update( {
            where : {
                PM_ID : paymentId,
            },
            data : {
                PM_STATUS : "F",
            },
        } );
        res.json( {
            isRejected : true,
        } );
        res.status( 200 );
        console.log( "Rejected payment" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.json( { message : "Payment not found" } );
        res.status( 400 );
        res.end();
    }
}

module.exports = {
    getPayments,
    getPayment,
    getPendingPayments,
    getCountTodayPayments,
    getCountTodayCheckedPayment,
    createPayment,
    approvePayment,
    rejectPayment,
}
