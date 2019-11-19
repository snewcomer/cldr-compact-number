let enLocaleData = {
  en: {
    locale: "en",
    numbers: {
      decimal: {
        long: [[1000, {
          one: ["0 thousand", 1],
          other: ["0 thousand", 1]
        }], [10000, {
          one: ["00 thousand", 2],
          other: ["00 thousand", 2]
        }], [100000, {
          one: ["000 thousand", 3],
          other: ["000 thousand", 3]
        }], [1000000, {
          one: ["0 million", 1],
          other: ["0 million", 1]
        }], [10000000, {
          one: ["00 million", 2],
          other: ["00 million", 2]
        }], [100000000, {
          one: ["000 million", 3],
          other: ["000 million", 3]
        }], [1000000000, {
          one: ["0 billion", 1],
          other: ["0 billion", 1]
        }], [10000000000, {
          one: ["00 billion", 2],
          other: ["00 billion", 2]
        }], [100000000000, {
          one: ["000 billion", 3],
          other: ["000 billion", 3]
        }], [1000000000000, {
          one: ["0 trillion", 1],
          other: ["0 trillion", 1]
        }], [10000000000000, {
          one: ["00 trillion", 2],
          other: ["00 trillion", 2]
        }], [100000000000000, {
          one: ["000 trillion", 3],
          other: ["000 trillion", 3]
        }]],
        short: [[1000, {
          one: ["0K", 1],
          other: ["0K", 1]
        }], [10000, {
          one: ["00K", 2],
          other: ["00K", 2]
        }], [100000, {
          one: ["000K", 3],
          other: ["000K", 3]
        }], [1000000, {
          one: ["0M", 1],
          other: ["0M", 1]
        }], [10000000, {
          one: ["00M", 2],
          other: ["00M", 2]
        }], [100000000, {
          one: ["000M", 3],
          other: ["000M", 3]
        }], [1000000000, {
          one: ["0B", 1],
          other: ["0B", 1]
        }], [10000000000, {
          one: ["00B", 2],
          other: ["00B", 2]
        }], [100000000000, {
          one: ["000B", 3],
          other: ["000B", 3]
        }], [1000000000000, {
          one: ["0T", 1],
          other: ["0T", 1]
        }], [10000000000000, {
          one: ["00T", 2],
          other: ["00T", 2]
        }], [100000000000000, {
          one: ["000T", 3],
          other: ["000T", 3]
        }]]
      }
    }
  }
}

enLocaleData = JSON.parse(JSON.stringify(enLocaleData));

export default enLocaleData;
