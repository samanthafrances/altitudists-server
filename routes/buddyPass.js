const express = require("express");
const router = express.Router();

const buddypassCtrl = require("../controllers/buddyPass");

router.get("/", buddypassCtrl.index);

router.post("/", buddypassCtrl.create);

router.get("/:id", buddypassCtrl.show);

router.delete("/:id", buddypassCtrl.delete);

router.put("/:id", buddypassCtrl.update);

module.exports = router;