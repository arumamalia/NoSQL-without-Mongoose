const express = require("express");
const barangValidator = require("../middlewares/validators/barangValidator");
const barangController = require("../controllers/barangController");

const router = express.Router();

router.get("/", barangController.getAll);
router.get("/:id", barangController.getOne);
router.post("/", barangValidator.create, barangController.create);
router.put("/:id", barangValidator.update, barangController.update);
router.delete("/:id", barangController.deletebarang);
module.exports = router;