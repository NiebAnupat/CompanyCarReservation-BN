const carObj = require( '../models/car' )
const car_imgObj = require( '../models/car_img' )
const { PrismaClient } = require( '@prisma/client' )
const prisma = new PrismaClient()

const getCars = async ( req, res ) => {
    console.log( 'GET /api/cars' )
    let [cars, imgs] = await Promise.all( [prisma.car.findMany(), prisma.car_img.findMany()] )
    cars = cars.map( ( car ) => {
        car.car_imgs = imgs.filter( ( img ) => img.C_ID === car.C_ID )
        return car
    } )

    const carObjs = cars.map( ( car ) => {
        return new carObj( car.C_ID, car.C_NAME, car.C_DESCRIPTION, car.C_LEVEL, car.C_STATUS, car.car_imgs )
    } )

    res.json( carObjs )
}

const getCar = async ( req, res ) => {
    console.log( `GET /api/cars/:${req.body.id}` )
    const car = await prisma.car.findUnique( {
        where : {
            C_ID : parseInt( req.body.id )
        }
    } )
    const car_imgs = await prisma.car_img.findMany( {
        where : {
            C_ID : parseInt( req.body.id )
        }
    } )

    const { C_ID, C_NAME, C_DESCRIPTION, C_LEVEL, C_STATUS } = car
    const imgs = car_imgs.map( ( car_img ) => {
        return car_img.IMG_FILE
    } )

    const car_Obj = new carObj( C_ID, C_NAME, C_DESCRIPTION, C_LEVEL, C_STATUS, imgs )
    res.json( car_Obj )

}

const createCar = async ( req, res ) => {
    console.log( 'POST /api/cars' )

    const images = []
    req.body.images.forEach( ( img ) => {
        images.push( new car_imgObj(
            req.body.C_ID,
            img.FileName,
            img.IMG_FILE,
        ) )
    } )
    const carObj = new carObj( req.body.C_ID, req.body.C_NAME, req.body.C_DESCRIPTION, req.body.C_LEVEL, req.body.C_STATUS, images )

    const car = await prisma.car.create( {
        data : {
            C_NAME : carObj.C_NAME,
            C_DESCRIPTION : carObj.C_DESCRIPTION,
            C_LEVEL : carObj.C_LEVEL,
        }
    } )

    const car_imgs = await prisma.car_img.createMany( {
        data : carObj.get().car_img
    } )


    res.json( car, car_imgs )
}

const updateCar = async ( req, res ) => {
    console.log( `PUT /api/cars/:${req.query.id}` )

    const images = []
    req.body.images.forEach( ( img ) => {
        images.push( new car_imgObj(
            req.query.id,
            img.FileName,
            img.IMG_FILE,
        ) )
    } )
    const carObj = new carObj( parseInt( req.query.id ), req.body.C_NAME, req.body.C_DESCRIPTION, req.body.C_LEVEL, req.body.C_STATUS, images )

    const car = await prisma.car.update( {
        where : {
            C_ID : parseInt( req.query.id )
        },
        data : {
            C_NAME : carObj.C_NAME,
            C_DESCRIPTION : carObj.C_DESCRIPTION,
            C_LEVEL : carObj.C_LEVEL,
        }
    } )

    const car_imgs = await prisma.car_img.update( {
        where : {
            C_ID : parseInt( req.query.id )
        },

        data : carObj.get().car_img
    } )

    res.json( car )
}


const deleteCar = async ( req, res ) => {
    console.log( `DELETE /api/cars/:${req.query.id}` )
    const car = await prisma.car.delete( {
        where : {
            C_ID : parseInt(req.query.id )
        }
    } )

    const car_imgs = await prisma.car_img.deleteMany( {
        where : {
            C_ID : parseInt( req.query.id )
        }
    } )

    res.json( car, car_imgs )
}

module.exports = {
    getCars, getCar, createCar, updateCar, deleteCar
}
