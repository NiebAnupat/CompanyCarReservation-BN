const router = require( "express" ).Router();
const upload = require("../middleware/upload");
const {
    getReservations,
    getReservation,
    getRecentReservations,
    getLatestReservation,
    getPendingReservations,
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
} = require( "../controllers/reservation.js" );

router.get( "/:EM_ID/all" , getReservations);

router.get( "/by/:id", getReservation );

router.get( "/recent/:EM_ID", getRecentReservations );

router.get( "/pending", getPendingReservations );

router.get( "/latest/:EM_ID", getLatestReservation )

router.get( "/count/today", getCountTodayReservations );

router.get( "/count/today/pending", getCountTodayPending );

router.get( "/count/today/check", getCountTodayCheck );

router.put( "/approve/:id", approveReservation );

router.put( "/reject/:id", rejectReservation );

router.put( "/:id", updateReservation );

router.post( "/", createReservation );

router.delete( "/:id", deleteReservation );

router.put( "/admin-note/:id", adminNote );

router.post( "/return/",upload.single('img'), returnReservation );

module.exports = router;
