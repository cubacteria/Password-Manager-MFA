const express = require("express");
const auth = require("../middleware/auth");
const {
  addVaultEntry,
  getVaultEntries,
  updateVaultEntry,
  deleteVaultEntry,
} = require("../controllers/vaultController");
const router = express.Router();

router.get("/", auth, getVaultEntries);
router.post("/", auth, addVaultEntry);
router.put("/:id", auth, updateVaultEntry);
router.delete("/:id", auth, deleteVaultEntry);

module.exports = router;
