const carObj = require( '../models/car' )
const car_imgObj = require( '../models/car_img' )
const { PrismaClient } = require( '@prisma/client' )
const prisma = new PrismaClient()

const getCars = async ( req, res ) => {
    console.log( 'GET /api/cars' )

    const cars = await prisma.car.findMany( {
        include : {
            car_img : true
        }
    } )

    console.log( 'Cars : ', cars )
    res.json( cars )

}

const getCar = async ( req, res ) => {
    console.log( `GET /api/cars/:${ req.body.id }` )
    const car = await prisma.car.findUnique( {
        where : {
            C_ID : parseInt( req.body.id )
        },
        include : {
            car_img : true
        }
    } )
    console.log( 'This Car : ', car )
    res.json( car )

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
            car_img : {
                createMany : {
                    data : [
                        carObj.get().car_img.map( ( img ) => {
                            return {
                                C_ID : img.C_ID,
                                FileName : img.FileName,
                                IMG_FILE : img.IMG_FILE
                            }
                        } )

                    ]
                }
            }
        },
        include : {
            car_img : true
        }
    } )

    // const car_imgs = await prisma.car_img.createMany( {
    //     data : carObj.get().car_img
    // } )


    res.json( car )
}

const updateCar = async ( req, res ) => {
    console.log( `PUT /api/cars/:${ req.body.id }` )

    const images = []
    req.body.images.forEach( ( img ) => {
        images.push( new car_imgObj(
            req.body.id,
            img.FileName,
            img.IMG_FILE,
        ) )
    } )
    const carObj = new carObj( parseInt( req.body.id ), req.body.C_NAME, req.body.C_DESCRIPTION, req.body.C_LEVEL, req.body.C_STATUS, images )

    const car = await prisma.car.update( {
        where : {
            C_ID : parseInt( req.query.id )
        },
        data : {
            C_NAME : carObj.C_NAME,
            C_DESCRIPTION : carObj.C_DESCRIPTION,
            C_LEVEL : carObj.C_LEVEL,
            car_img : {
                updateMany : {
                    where : {
                        C_ID : parseInt( req.query.id )
                    },
                    data : [
                        carObj.get().car_img.map( ( img ) => {
                            return {
                                C_ID : img.C_ID,
                                FileName : img.FileName,
                                IMG_FILE : img.IMG_FILE
                            }
                        })
                    ]
                }
            }
        },
        include : {
            car_img : true
        }
    } )
    res.json( car )
}


const deleteCar = async ( req, res ) => {
    console.log( `DELETE /api/cars/:${ req.body.id }` )

    const car_imgs = await prisma.car_img.deleteMany( {
        where : {
            C_ID : parseInt( req.body.id )
        },
    })

    const car = await prisma.car.delete( {
        where : {
            C_ID : parseInt( req.body.id )
        }
    } )
    res.json( car )
}

module.exports = {
    getCars, getCar, createCar, updateCar, deleteCar
}
