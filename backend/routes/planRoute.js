const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { isLogined } = require('../middlewires/auth');  // Correctly destructure isLogined

router.use(express.json());

// Define routes for CRUD operations
router.post('/plans', planController.createPlan);
router.get('/plans', planController.getPlans);
router.put('/plans/:id', planController.updatePlan);
router.delete('/plans/:id', planController.deletePlan);


module.exports = router;
