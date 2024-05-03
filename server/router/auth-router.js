const express = require("express");
const axios=require("axios");
const router = express.Router();
const authController=require("../controllers/auth-controller");
const resController=require("../controllers/res-controller");
const signupSchema=require("../validators/auth-validator");
const validate=require("../middlewares/validate-middleware");
const User=require("../models/user-model");


router.post("/",validate(signupSchema),authController.home);

router.post("/login", authController.login);
router.get('/user/:userId', authController.userfind);
  
router.get("/questions/:category", async (req, res) => {
    const { category } = req.params;
    const apiKey = "IXDTud4zLCX1cOogSnQvrNx7OVdWsWVTweHVACwo";
    const limit = 10;
    const apiUrl = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=${limit}&category=${category}`;
  
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      res.json(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ error: "Error fetching questions" });
    }
  });
router.post("/storeresult",resController.store_res);

module.exports = router;
