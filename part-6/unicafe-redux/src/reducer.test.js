// import statements
import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    // initialize state and action
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    // expect initial state to be returned
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    // initialize state and action
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    // expect `good` to be incremented
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    // initialize state and action
    const action = {
      type: 'OK'
    }
    const state = initialState

    // expect `ok` to be incremented
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    // initialize state and action
    const action = {
      type: 'BAD'
    }
    const state = initialState

    // expect `bad` to be incremented
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset stats', () => {
    // initialize state and action
    const action = {
      type: 'ZERO'
    }
    const state = {
      good: 8,
      ok: 8,
      bad: 8
    }

    // expect all fields in state to be 0
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })
})