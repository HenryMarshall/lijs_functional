const R = require("ramda")
const { fromJS } = require("immutable")

function primitiveReducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1
    case "SET":
      return action.counter
    default:
      return state
  }
}

// DON'T DO THIS! ANTI-PATTERN
function impureReducer(state = { counter: 0, foo: "bar" }, action) {
  switch (action.type) {
    case "INCRMENT":
      ++state.counter
      return state
    case "SET":
      state.counter = action.counter
      return state
    default:
      return state
  }
}

function manualReducer(state = { counter: 0, foo: "bar" }, action) {
  switch (action.type) {
    case "INCREMENT":
      return Object.assign({}, state, { counter: state.counter + 1 })
    case "SET":
      return Object.assign({}, state, { counter: action.counter })
    default:
      return state
  }
}

function immutableReducer(state = fromJS({ counter: 0, foo: "bar" }), action) {
  switch (action.type) {
    case "INCREMENT":
      return state.set("counter", state.get("counter") + 1)
    case "SET":
      return state.set("counter", action.counter)
    default:
      return state
  }
}

function ramdaReducer(state = { counter: 0, foo: "bar" }, action) {
  // Note: Ramda's functions are all auto-curried and accept partial application
  const setCounter = R.assoc("counter", R.__, state)
  switch (action.type) {
    case "INCREMENT":
      return setCounter(state.counter + 1)
    case "SET":
      return setCounter(action.counter)
    default:
      return state
  }
}

module.exports = {
  primitiveReducer,
  impureReducer,
  manualReducer,
  immutableReducer,
  ramdaReducer,
}

