const express = require("express");
const pemasokValidator = require("../middlewares/validators/pemasokValidator");
const pemasokController = require("../controllers/pemasokController");

const router = express.Router();

router.get("/", pemasokController.getAll);
router.get("/:id", pemasokController.getOne);
router.post("/", pemasokValidator.create, pemasokController.create);
router.put("/:id", pemasokValidator.update, pemasokController.update);
router.delete("/:id", pemasokController.deleteBarang);
module.exports = router;