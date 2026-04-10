const crypto = require("crypto");

const algorithm = "aes-256-cbc";

const getKey = (secret) => {
  return crypto.createHash("sha256").update(secret).digest();
};

const encrypt = (text, secret) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, getKey(secret), iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

const decrypt = (payload, secret) => {
  const [ivHex, encryptedHex] = payload.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, getKey(secret), iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
};

module.exports = { encrypt, decrypt };
