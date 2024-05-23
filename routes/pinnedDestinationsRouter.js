const express = require("express");
const router = express.Router();

const pinnedDestinationsCtrl = require("../controllers/pinnedDestinations");

router.get("/", pinnedDestinationsCtrl.index);

router.post("/", pinnedDestinationsCtrl.create);

router.get("/:id", pinnedDestinationsCtrl.show);

router.delete("/:id", pinnedDestinationsCtrl.delete);

router.put("/:id", pinnedDestinationsCtrl.update);

module.exports = router;