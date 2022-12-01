const router = require( "express" ).Router();
const upload = require("../middleware/upload");
const {
    getPayments,
    getPayment,
    getPendingPayments,
    getCountTodayPayments,
    getCountTodayCheckedPayment,
    createPayment,
    approvePayment,
    rejectPayment,
} = require( "../controllers/payment.js" );

router.get("/all", getPayments);

router.get( "/:id" , getPayment);

router.get( "/get/pending" , getPendingPayments);

router.get( "/count/today" , getCountTodayPayments);

router.get( "/count/today/checked" , getCountTodayCheckedPayment);

router.put( "/approve/:id" , approvePayment);

router.put( "/reject/:id" , rejectPayment);

router.post( "/" ,upload.single('img'), createPayment);

module.exports = router;
