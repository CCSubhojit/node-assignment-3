const express = require("express");
const appController = require("../controller/appController");

const router = express.Router();
router.route("/").get(appController.showForm);
router.route("/update-elements").post(appController.updateFormElement);
router.route("/dynamic-form-submit").post(appController.saveDynamicFormData);

module.exports = router;
