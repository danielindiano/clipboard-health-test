const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the event partition key when it is set", () => {
    const event = {
      data: "Anything",
      partitionKey: "the-partition-key",
    };

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("the-partition-key");
  });

  it("Returns the hashed event when there's no partitionKey in event", () => {
    const event = {
      data: "Anything",
      notAPartitionKey: "the-partition-key",
    };

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).not.toBe("the-partition-key");
  });

  it("Returns a hashed version of Partition Key when its length exceeds the max_partition_key_length", () => {
    const event = {
      data: "Anything",
      partitionKey:
        "this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-this-is-a-big-partition-key-",
    };

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).not.toBe(event.partitionKey);
  });
});
