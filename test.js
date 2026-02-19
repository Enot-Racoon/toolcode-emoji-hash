const emojiHash = require("./index.js")

let passed = 0
let failed = 0

const assert = (label, condition) => {
  if (condition) {
    console.log(`  ✓ ${label}`)
    passed++
  } else {
    console.error(`  ✗ ${label}`)
    failed++
  }
}

console.log("\nDeterminism")
assert("same input → same output",
  emojiHash("hello") === emojiHash("hello"))
assert("different input → different output",
  emojiHash("hello") !== emojiHash("world"))

console.log("\nOptions: length")
assert("default length is 4 emoji",
  [...new Intl.Segmenter().segment(emojiHash("x"))].length === 4)
assert("length: 2",
  [...new Intl.Segmenter().segment(emojiHash("x", { length: 2 }))].length === 2)
assert("length: 8",
  [...new Intl.Segmenter().segment(emojiHash("x", { length: 8 }))].length === 8)

console.log("\nOptions: depth")
assert("depth 32 is deterministic",
  emojiHash("abc", { depth: 32 }) === emojiHash("abc", { depth: 32 }))
assert("depth 64 is deterministic",
  emojiHash("abc", { depth: 64 }) === emojiHash("abc", { depth: 64 }))
assert("depth 32 and 64 differ",
  emojiHash("abc", { depth: 32 }) !== emojiHash("abc", { depth: 64 }))

console.log("\nEdge cases")
assert("empty string", typeof emojiHash("") === "string")
assert("number input", typeof emojiHash(0) === "string")
assert("zero produces valid output", emojiHash(0).length > 0)

console.log(`\n${passed} passed, ${failed} failed\n`)
if (failed > 0) process.exit(1)
