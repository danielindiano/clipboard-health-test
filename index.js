const { deterministicPartitionKey } = require("./dpk");

// No candidate
{
  const trivialKey = deterministicPartitionKey();
  console.log(trivialKey);
}

// With Partition Key
{
  const event = {
    data: "Anything",
    partitionKey: "the-partition-key",
  };

  const trivialKey = deterministicPartitionKey(event);
  console.log(trivialKey);
}

// Without Partition Key
{
  const event = {
    data: "Anything",
    notAPartitionKey: "not-the-partition-key",
  };

  const trivialKey = deterministicPartitionKey(event);
  console.log(trivialKey);
}

// With bigger Partition Key (> MAX_PARTITION_KEY_LENGTH)
{
  const event = {
    data: "Anything",
    partitionKey:
      "this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-",
  };

  const trivialKey = deterministicPartitionKey(event);
  console.log(trivialKey);
}

// When the partition key is not a string
{
  const event = {
    data: "Anything",
    partitionKey: { a: 1, b: 2 },
  };

  const trivialKey = deterministicPartitionKey(event);
}
