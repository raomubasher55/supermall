// controllers/planController.js

const  planModel = require("../models/planModel");
const userModel = require("../models/userModel");


// Create a new plan
const createPlan = async (req, res) => {
    try {
        const { name, duration, price } = req.body;

        const newPlan = new planModel({
            name,
            duration,
            price,
            status: 'pending', // Default status
        });

        const planData = await newPlan.save();

        return res.status(201).json({
            success: true,
            msg: 'Plan created successfully',
            data: planData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message,
        });
    }
};

// Get all plans
const getPlans = async (req, res) => {
    try {
        const plans = await planModel.find();
        return res.status(200).json({
            success: true,
            data: plans
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message,
        });
    }
};

// Update a plan
const updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedPlan = await planModel.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedPlan) {
            return res.status(404).json({
                success: false,
                msg: 'Plan not found'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Plan updated successfully',
            data: updatedPlan
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message,
        });
    }
};

// Delete a plan
const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPlan = await planModel.findByIdAndDelete(id);

        if (!deletedPlan) {
            return res.status(404).json({
                success: false,
                msg: 'Plan not found'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Plan deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message,
        });
    }
};


    // controllers/planController.js

    const transitionPlan = async (userId, nextPlanId) => {
        try {
            // Find the user
            const user = await userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
    
            // Check if the current plan is valid
            if (!user.currentPlan) {
                throw new Error('Current plan not set');
            }
    
            // Update current plan to completed
            await planModel.findByIdAndUpdate(user.currentPlan, { status: 'completed' });
    
            // Update user to next plan
            user.currentPlan = nextPlanId;
            await user.save();
    
            // Set next plan to active
            await planModel.findByIdAndUpdate(nextPlanId, { status: 'active' });
    
            return { success: true, msg: 'Plan updated successfully' };
        } catch (error) {
            return { success: false, msg: error.message };
        }
    }

module.exports =  {
    createPlan,
    getPlans,
    updatePlan,
    deletePlan,
    transitionPlan
};
