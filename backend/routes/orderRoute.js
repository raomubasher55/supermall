const express = require('express');
const path = require('path'); // Import the path module
const router = express.Router();
const productController = require('../controllers/productController');
const { isLogined, isAdmin } = require('../middlewires/auth');
const { createProductValidator } = require('../helper/productValidator');
const multer = require('multer');
const { createOrder, updateOrderStatus, getAllOrders, getUnpaidOrders, getPaidOrders, getAllOrder, checkout } = require('../controllers/orderController');

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, path.join(__dirname,'../public/images/'));
        } else {
            cb(new Error("Invalid file type"), false);
        }
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});


router.post('/create' , isLogined , createOrder);   
router.put('/update' , isLogined , updateOrderStatus);
router.get('/all-orders' , isLogined , getAllOrders);
router.get('/unpaid-order' , isLogined , getUnpaidOrders);
router.get('/paid-order' , isLogined , getPaidOrders); 
router.get('/all-order' , isLogined , getAllOrder); 
router.post('/checkout' , isLogined , checkout); 

router.use(express.json());







module.exports = router;
 