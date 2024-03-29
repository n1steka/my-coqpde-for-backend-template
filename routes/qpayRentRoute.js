const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();
const { createqpay, callback } = require("../controller/qpayRent-controller.js")
const { protect } = require("../middleware/protect.js")

router.route("/:id").post(protect, createqpay);
router.route("/callback/:id").get(protect, callback)
module.exports = router;