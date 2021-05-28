const express = require("express");
const pelangganValidator = require("../middlewares/validators/pelangganValidator");
const pelangganController = require("../controllers/pelangganController");

const router = express.Router();

router.get("/", pelangganController.getAll);
router.get("/:id", pelangganController.getOne);
router.post("/", pelangganValidator.create, pelangganController.create);
router.put("/:id", pelangganValidator.update, pelangganController.update);
router.delete("/:id", pelangganController.deleteBarang);
module.exports = router;