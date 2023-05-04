const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when the input is falsy", () => {
    let trivialKey = deterministicPartitionKey(false);
    expect(trivialKey).toBe("0");

    trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");

    trivialKey = deterministicPartitionKey(NaN);
    expect(trivialKey).toBe("0");

    trivialKey = deterministicPartitionKey("");
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

  it("Returns the hashed event when the partitionKey is an empty string", () => {
    const event = {
      data: "Anything",
      partitionKey: "",
    };

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).not.toBe(event.partitionKey);
  });

  it("Returns the hashed event when the partitionKey is null or undefined", () => {
    const event = {
      data: "Anything",
      partitionKey: null,
    };

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).not.toBe(event.partitionKey);
  });

  it("Returns the hashed event when the event is an truthy object", () => {
    let trivialKey = deterministicPartitionKey({});
    expect(trivialKey).not.toBe("0");

    trivialKey = deterministicPartitionKey([]);
    expect(trivialKey).not.toBe("0");

    trivialKey = deterministicPartitionKey(true);
    expect(trivialKey).not.toBe("0");

    trivialKey = deterministicPartitionKey(new String(""));
    expect(trivialKey).not.toBe("0");
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

  it("Returns a string version of partitionKey when it is not of string type", () => {
    const event = {
      data: "Anything",
      partitionKey: { a: 1, b: 2 },
    };

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe('{"a":1,"b":2}');
  });
});
