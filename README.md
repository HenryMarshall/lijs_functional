# Functional Benefits
- Easy testing (no state to setup and tear down)
- Easy caching
- Easy debugging (you know where the problem occurred)
- Easy to reason about

# What does it look like?
- Pure Functions: Data In -> ??? -> Data Out
- Composing big functions out of small ones
- You are already doing it if you use `map`, `reduce`, `filter` etc.

# FP in JS
- Possible because:
  - Functions are first-class
  - Closures
- Primitives (strings, booleans, numbers) are immutable
- Objects and arrays (which are in fact objects) are mutable.
  - Explain stack vs heap

## Solutions
- Force of will
  - Pro: No libraries
  - Con: Requires manual compliance
    - Show with `Object.assign({}, myObj)` and `[].concat(myArr)`
    - You may freeze objects to cause errors to be thrown
    - Deeply nested must be cloned recursively
- New data structures (Immutable)
  - Pro: Familiar ES2015-esque syntax
  - Pro: Optimized through "structural sharing"
  - Pro: Very popular in conjunction with Redux
  - Con: Harder to debug (you must use the REPL)
  - Con: Converting to POJO/Array is expensive
  - Con: Poor interop (see: `react-immutable-proptypes`)
- New way of interacting with data structures (Ramda)
  - Pro: Fantastic interop -- Easy to integrate into an existing project
  - Pro: Simplifies composition and currying
  - Neutral: Lodash-esque syntax
  - Con: Structural sharing impossible
  - Con: Objects not innately immutable (negate with `seamless-immutable`)
