# @toolcode/emoji-hash

Turns any value into a short, deterministic emoji string. Useful for visually tagging objects in debug logs — much easier to spot than raw UUIDs or numbers.

```
user-1337  →  🐯🌊😎🍕
user-1338  →  🍇🤖🌙🔑
session-x  →  😂🐘⚡🍕
```

Same input always produces the same output. No dependencies.

## Install

```bash
npm install @toolcode/emoji-hash
```

## Usage

```js
const emojiHash = require("@toolcode/emoji-hash")

// Default: 4 emoji, 32-bit hash (good up to ~1M entries)
console.log(emojiHash("user-1337"))         // 🐯🌊😎🍕
console.log(emojiHash(42))                  // 😂🐘⚡🍕
console.log(emojiHash({ id: 1 }))           // hashes "[object Object]", pass a real value

// More emoji = easier to read at a glance
console.log(emojiHash("user-1337", { length: 6 }))   // 🐯🌊😎🍕🧩🌙

// 64-bit hash for large datasets (up to ~16M entries without collisions)
console.log(emojiHash("user-1337", { depth: 64 }))
```

### ESM

```js
import emojiHash from "@toolcode/emoji-hash"
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `length` | `4` | Number of emoji in the result (1–8) |
| `depth` | `32` | Hash depth in bits. Use `64` for datasets > 1M entries |

## Collision probability

| Max entries | length | depth | Collision chance |
|-------------|--------|-------|-----------------|
| 100 000 | 3 | 32 | < 0.1% |
| 1 000 000 | 4 | 32 | < 0.1% |
| 16 000 000 | 4 | 64 | < 0.01% |
| 1 000 000 000 | 5 | 64 | < 0.01% |

## How it works

1. FNV-1a 32-bit hash of the input string (two independent hashes at `depth: 64`)
2. Seeds an xorshift PRNG with the hash state
3. For each position, picks a random emoji group (emotion, animal, nature, food, object, vehicle, symbol), then a random emoji within it

448 unique emoji across 7 groups. Output space at `length: 4` is 448⁴ ≈ 40 billion combinations.

## License

MIT
