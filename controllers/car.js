const fs = require( "fs" );
const { PrismaClient } = require( "@prisma/client" );
const prisma = new PrismaClient();


const getCars = async ( req, res ) => {
    console.log( "GET /api/cars" );

    try {
        const cars = await prisma.car.findMany( {
            where : {
                C_STATUS : true,
            },
            include : {
                car_img : true,
                favorite : true,
            },
        } );
        res.json( cars );
        res.status( 200 );
        console.log( "Sent Cars" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.status( 500 );
        res.end();
    }

};

const getCarsByEmployee = async ( req, res ) => {
    const emId = parseInt( req.params.EM_ID );
    console.log( `GET /api/cars/employee/:${ emId }` );
    try {
        // get employee level
        const employee = await prisma.employee.findUnique( {
            where : {
                EM_ID : emId,
            }
        })

        const cars = await prisma.car.findMany( {
            where : {
                C_STATUS : true,
                C_LEVEL : {
                    lte : employee.P_ID
                }
            },
            include : {
                car_img : true,
                favorite : true,
            },
        })

        res.json( cars );
        res.status( 200 );
        console.log( "Sent Cars" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.status( 500 );
        res.end();
    }
}


const getCar = async ( req, res ) => {
    const carId = parseInt( req.params.id );
    console.log( `GET /api/cars/:${ carId }` );
    try {
        const car = await prisma.car.findUnique( {
            where : {
                C_ID : carId,
                C_STATUS : true,
            },
            include : {
                car_img : true,
            },
        } );
        console.log( "This Car : ", car );
        res.json( car );
        res.status( 200 );
        console.log( "Sended Car" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.status( 500 );
        res.end();
    }
};



const createCar = async ( req, res ) => {
    console.log( "POST /api/car" );

    try {

        if ( req.files === undefined ) return res.status( 400 ).send( "กรุณาเพิ่มรูปภาพ" );

        const { C_NAME, C_DESCRIPTION, C_LEVEL } = req.body;

        const files = req.files;
        let images = [];

        files.forEach( ( file ) => {
            images.push( {
                FileName : file.originalname,
                IMG_FILE : fs.readFileSync(
                    __basedir + "/assets/uploads/" + file.filename
                ),
            } );
        } );

        const car = await prisma.car.create( {
            data : {
                C_NAME : C_NAME,
                C_DESCRIPTION : C_DESCRIPTION,
                C_LEVEL : parseInt( C_LEVEL ),
                car_img : {
                    createMany : {
                        data : images,
                    }
                }
            },
            include : {
                car_img : true,
            }
        } )

        // remove all tmp images
        const directoryPath = __basedir + "/assets/temp";
        fs.readdir( directoryPath, ( err, files ) => {
            if ( err ) {
                return console.log( "Unable to scan directory: " + err );
            }
            files.forEach( ( file ) => {
                file = directoryPath + "/" + file;
                fs.unlink( file, ( err ) => {
                        if ( err ) throw err;
                        console.log( file + " was deleted" );
                    }
                );

            } )
        } )
        res.json( car );

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            message : `Cannot upload file. Error : ${ error }`,
            errorMsg : error.message,
            error : error
        } );
    }
}


const updateCar = async ( req, res ) => {
    const carId = parseInt( req.body.C_ID );
    console.log( `PUT /api/cars/:${ carId }` );
    try {
        const { C_NAME, C_DESCRIPTION, C_LEVEL } = req.body;
        if ( req.files.length > 0 ) {
            const files = req.files;
            var images = [];
            files.forEach( ( file ) => {
                images.push( {
                    FileName : file.originalname,
                    IMG_FILE : fs.readFileSync(
                        __basedir + "/assets/uploads/" + file.filename
                    ),
                } );
            } )

            // delete old images
            await prisma.car_img.deleteMany( {
                where : {
                    C_ID : carId,
                }
            } )

            const car = await prisma.car.update( {
                where : {
                    C_ID : carId,
                },
                data : {
                    C_NAME : C_NAME,
                    C_DESCRIPTION : C_DESCRIPTION,
                    C_LEVEL : parseInt( C_LEVEL ),
                    car_img : {
                        createMany : {
                            data : images,
                        }
                    }
                }
            } )

            // remove all tmp images
            const directoryPath = __basedir + "/assets/temp";
            fs.readdir( directoryPath, ( err, files ) => {
                if ( err ) {
                    return console.log( "Unable to scan directory: " + err );
                }
                files.forEach( ( file ) => {
                    file = directoryPath + "/" + file;
                    fs.unlink( file, ( err ) => {
                            if ( err ) throw err;
                            console.log( file + " was deleted" );
                        }
                    );
                } )
            } )

            res.json( car );
            res.status( 200 );
            console.log( "Car Updated" );
            res.end();
        }
        else{
            const car = await prisma.car.update( {
                where : {
                    C_ID : carId,
                },
                data : {
                    C_NAME : C_NAME,
                    C_DESCRIPTION : C_DESCRIPTION,
                    C_LEVEL : parseInt( C_LEVEL ),
                }
            } )

            res.json( car );
            res.status( 200 );
            console.log( "Car Updated" );
            res.end();
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 );
        res.end();
    }
};

const deleteCar = async ( req, res ) => {
    const carId = parseInt( req.params.id );
    console.log( `DELETE /api/cars/:${ carId }` );
    try {

        // update car status to 0
        const car = await prisma.car.update( {
            where : {
                C_ID : carId,
            },
            data : {
                C_STATUS : false,
            }
        })

        res.json( car );
        res.status( 200 );
        console.log( "Car Deleted" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.status( 500 );
        res.end();
    }
};

const toggleFavoriteCar = async ( req, res ) => {

    const carId = parseInt( req.params.id );
    const emId = parseInt( req.body.EM_ID );

    console.log( `PUT /api/cars/favorite/:${ carId }` );

    console.log( "Car ID : ", carId );
    console.log( "Employee ID : ", emId );
    try {

        const favorite = await prisma.favorite.findFirst( {
            where : {
                C_ID : carId,
                EM_ID : emId,
            }
        } )

        if ( favorite ) {
            await prisma.favorite.delete( {
                where : {
                    F_ID : favorite.F_ID
                }
            } )
        } else {
            await prisma.favorite.create( {
                data : {
                    C_ID : carId,
                    EM_ID : emId,
                }
            } )
        }

        console.log( "Car Favorite Toggled" );
        res.status( 200 );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.status( 500 );
        res.end();
    }
}

const getFavoriteCars = async ( req, res ) => {
    const emId = parseInt( req.params.EM_ID );
    console.log( `GET /api/cars/favorite/:${ emId }` );
    try {
        const cars = await prisma.favorite.findMany( {
            where : {
                EM_ID : emId,
                car : {
                    C_STATUS : true,
                }
            },
            include : {
                car : {
                    include : {
                        car_img : true,
                    }
                }
            },
        } );
        res.json( cars );
        res.status( 200 );
        console.log( "Favorite Cars Retrieved" );
        res.end();
    } catch ( error ) {
        console.log( error );
        res.status( 500 );
        res.end();
    }
}

module.exports = {
    getCars,
    getCar,
    getCarsByEmployee,
    createCar,
    updateCar,
    deleteCar,
    toggleFavoriteCar,
    getFavoriteCars
};
