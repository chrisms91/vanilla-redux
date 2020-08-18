import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');
const ADD = 'ADD';
const MINUS = 'MINUS';

// function that modifies your data.
// whatever this function returns, it becomes the state of the application.
// this function can only modifies the data.
// action must be an object and have type
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return (count += 1);
    case MINUS:
      return (count -= 1);
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);
