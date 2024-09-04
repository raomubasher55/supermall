const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');
const { signupValidator, loginValidator, updateProfileValidator  } = require('../helper/validator');
const { isLogined } = require('../middlewires/auth');  // Correctly destructure isLogined

router.use(express.json());

router.post('/register', signupValidator, userController.signupUser);
router.post('/login', loginValidator, userController.loginUser);

// Authenticated routes
router.get('/profile', isLogined, userController.userProfile);
router.post('/updateprofile', isLogined, updateProfileValidator, userController.updateProfile);
router.get('/logout', isLogined, userController.logout);
router.put('/bank-detail', isLogined , userController.bankDetail); 


router.post('/transition-plan', async (req, res) => {
    const { userId, nextPlanId } = req.body;

    try {
        const result = await userController.transitionPlan(userId, nextPlanId);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
});





module.exports = router;
