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

  // When event.partitionKey is not a string, we stringify it
  const candidate =
    typeof event.partitionKey === "string"
      ? event.partitionKey
      : JSON.stringify(event.partitionKey);

  // Returns the candidate or it's encrypted hash when its length exceeds the max_partition_key_length
  return candidate.length <= MAX_PARTITION_KEY_LENGTH
    ? candidate
    : encryptData(candidate);
};
