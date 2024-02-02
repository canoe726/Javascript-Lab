import { createStore } from "../cores/ReduxStore.js";

const initState = {
  a: 10,
  b: 20,
};

export const SET_A = 'SET_A';
export const SET_B = 'SET_B';

const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case 'SET_A':
      return { ...state, a: action.payload }
    case 'SET_B':
      return { ...state, b: action.payload }
    default:
      return state;
  }
});

export const setA = (payload) => ({ type: 'SET_A', payload });
export const setB = (payload) => ({ type: 'SET_B', payload });

export { store };
