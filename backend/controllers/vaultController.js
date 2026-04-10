const VaultEntry = require("../models/PasswordEntry");
const { encrypt, decrypt } = require("../utils/crypto");

exports.addVaultEntry = async (req, res) => {
  const { website, username, password } = req.body;

  if (!website || !username || !password) {
    return res
      .status(400)
      .json({ message: "Website, username, and password are required" });
  }

  try {
    const encryptedPassword = encrypt(password, process.env.AES_SECRET);
    const entry = new VaultEntry({
      userId: req.user.id,
      website,
      username,
      password: encryptedPassword,
    });

    const savedEntry = await entry.save();
    res.status(201).json({
      id: savedEntry.id,
      website: savedEntry.website,
      username: savedEntry.username,
      password,
      createdAt: savedEntry.createdAt,
      updatedAt: savedEntry.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getVaultEntries = async (req, res) => {
  try {
    const entries = await VaultEntry.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    const decryptedEntries = entries.map((entry) => ({
      id: entry.id,
      website: entry.website,
      username: entry.username,
      password: decrypt(entry.password, process.env.AES_SECRET),
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    }));

    res.json(decryptedEntries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateVaultEntry = async (req, res) => {
  const { website, username, password } = req.body;

  try {
    const entry = await VaultEntry.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({ message: "Vault entry not found" });
    }

    entry.website = website || entry.website;
    entry.username = username || entry.username;
    entry.password = password
      ? encrypt(password, process.env.AES_SECRET)
      : entry.password;

    const updatedEntry = await entry.save();
    res.json({
      id: updatedEntry.id,
      website: updatedEntry.website,
      username: updatedEntry.username,
      password: decrypt(updatedEntry.password, process.env.AES_SECRET),
      createdAt: updatedEntry.createdAt,
      updatedAt: updatedEntry.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteVaultEntry = async (req, res) => {
  try {
    const entry = await VaultEntry.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({ message: "Vault entry not found" });
    }

    res.json({ message: "Vault entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
