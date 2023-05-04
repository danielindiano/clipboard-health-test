const { encryptData } = require("./crypt");

// Moved this constants to outter scope.
// TODO: These constants maybe can come from a config file or lib.
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  // If there'no event or it's falsy, then return the trivial key
  if (!event) return TRIVIAL_PARTITION_KEY;

  try {
    // If there's no partition key on event, then return the whole event encrypted
    if (!event.partitionKey) {
      return encryptData(JSON.stringify(event));
    }

    // When event.partitionKey is not a string, we stringify it
    const partitionKeyCandidate =
      typeof event.partitionKey === "string"
        ? event.partitionKey
        : JSON.stringify(event.partitionKey);

    // Returns the candidate or it's encrypted hash when its length exceeds the max_partition_key_length
    return partitionKeyCandidate.length <= MAX_PARTITION_KEY_LENGTH
      ? partitionKeyCandidate
      : encryptData(partitionKeyCandidate);
  } catch (error) {
    console.log(
      "An error ocurred while generating partitionKey. Error: ",
      error
    );
    return TRIVIAL_PARTITION_KEY;
  }
};
