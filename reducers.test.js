const test = require("ava")
const { createStore } = require("redux")
// react-redux fulfills the role of redux-watch in (most) react applications
const watch = require("redux-watch")
const { fromJS } = require("immutable")
const R = require("ramda")

const reducers = require("./reducers")

test("Primitives should trigger subscriptions on change", t => {
  const store = createStore(reducers.primitiveReducer)
  const w = watch(store.getState)
  t.plan(2)
  store.subscribe(w((newVal, oldVal) => {
    t.not(oldVal, newVal)
    t.is(store.getState(), 1)
  }))
  store.dispatch({ type: "INCREMENT" })
})

test("An impureReducer prevents subscriptions from identifying changes", t => {
  const store = createStore(reducers.impureReducer)
  const w = watch(store.getState)
  // The anonymous function is required as t.fail is particular about its args
  store.subscribe(w(() => t.fail()))
  store.dispatch({ type: "INCREMENT" })
})

function pojoTest(t) {
  const store = createStore(reducers.manualReducer)
  const w = watch(store.getState)
  t.plan(1)
  store.subscribe(w(() => {
    t.deepEqual(store.getState(), { counter: 7, foo: "bar" })
  }))
  store.dispatch({ type: "SET", counter: 7 })
}

test("manualReducer ensures immutability through fastidiousness", pojoTest)
test("Ramda uses a function which returns a duplicate", pojoTest)

test("Immutable.js uses getters and setters", t => {
  const store = createStore(reducers.immutableReducer)
  const w = watch(store.getState)
  t.plan(1)
  store.subscribe(w(() => {
    // Note: We had to use immutable's `equals` as ava's `deepEqual` won't work
    t.true(store.getState().equals(fromJS({ counter: 1, foo: "bar" })))
  }))
  store.dispatch({ type: "INCREMENT" })
})

test("Immutable.js does *not* update if there would be no change", t => {
  const store = createStore(reducers.immutableReducer)
  const w = watch(store.getState)
  t.plan(0)
  store.subscribe(w(() => t.fail()))
  store.dispatch({ type: "SET", counter: 0 })
})

test("Ramda *does* update if there would be no change", t => {
  const store = createStore(reducers.ramdaReducer)
  // redux-watch can handle this possibility by passing in R.equals as the 
  // third arg, but performing a deep equality check is expensive anyway.
  const w = watch(store.getState)
  t.plan(1)
  store.subscribe(w((newVal, oldVal) => {
    t.true(R.equals(oldVal, newVal))
  }))
  store.dispatch({ type: "SET", counter: 0 })
})


