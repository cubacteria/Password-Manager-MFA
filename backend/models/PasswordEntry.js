const mongoose = require("mongoose");

const VaultEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    website: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("VaultEntry", VaultEntrySchema);
