const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  let candidate;

  if (event.partitionKey) {
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if (typeof candidate !== "string") {
    // Maybe this code is not reached
    candidate = JSON.stringify(candidate);
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
