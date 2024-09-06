const express = require('express');
const path = require('path'); // Import the path module
const router = express.Router();
const productController = require('../controllers/productController');
const { isLogined, isAdmin } = require('../middlewires/auth');
const { createProductValidator } = require('../helper/productValidator');
const multer = require('multer');

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

router.use(express.json());

router.post(
    "/create-product",
    isLogined,
    isAdmin,
    upload.single("image"),
    createProductValidator,
    productController.createProduct
);

router.get("/get-product", productController.getAllProducts);
router.get("/single-product/:slug", productController.getSingleProducts);
router.get("/product-images/:pid", productController.getImages);
router.delete(
    "/delete-product/:pid",
    isLogined,
    isAdmin,
    productController.deleteProduct
);

router.put(
    "/update-product/:pid",
    isLogined,
    isAdmin, // Corrected this line
    upload.single("image"),
    productController.updateProduct
);

router.post("/product-filter", productController.filterProduct);
router.get("/count-product", productController.productCount);
router.get("/list-product/:page", productController.productList);
router.get("/search/:keyword", productController.searchProducts);

router.post('/checkout',isLogined ,productController.createPayment);

router.post('/update-purchase' , productController.updatePurchase);

router.get('/orders' , isLogined, productController.getAllOrder);
router.post('/withdraw' ,isLogined , productController.withdraw);





router.post('/webhook', async (req, res) => {
    const event = req.body;
  
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Handle the checkout session completion
        await productController.handleCheckoutSessionCompleted(session);
        break;
      default:
        console.warn(`Unhandled event type ${event.type}`);
    }
  
    res.status(200).end();
  });
router.post('/payment-success', productController.handlePaymentSuccess);


module.exports = router;
 