const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

encryptData = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {
  // If there'no event or it's falsy, then return the trivial key
  if (!event) return TRIVIAL_PARTITION_KEY;

  // If there's no partition key on event, then return the whole event encrypted
  if (!event.partitionKey) {
    return encryptData(JSON.stringify(event));
  }

  let candidate;
  candidate = event.partitionKey;
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = encryptData(candidate);
  }

  return candidate;
};
