const crypto = require("crypto");

exports.encryptData = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");
