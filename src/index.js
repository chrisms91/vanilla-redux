import { createStore } from 'redux';
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const addToDoAction = (toDo) => {
  return {
    type: ADD_TODO,
    text: toDo,
  };
};

const deleteToDoAction = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

// NEVER mutate state!!!
// RETURN new object for state!!!
const reducer = (todos = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodoObj = { text: action.text, id: Date.now() };
      return [newTodoObj, ...todos];
    case DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.id);
    default:
      return todos;
  }
};

const dispatchAddToDo = (toDo) => {
  store.dispatch(addToDoAction(toDo));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  console.log(id);
  store.dispatch(deleteToDoAction(id));
};

const paintToDos = () => {
  const currentToDos = store.getState();
  ul.innerHTML = '';
  currentToDos.forEach((todo) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = 'DEL';
    btn.addEventListener('click', dispatchDeleteToDo);
    li.innerText = todo.text;
    li.id = todo.id;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

const store = createStore(reducer);
store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  dispatchAddToDo(toDo);
};

form.addEventListener('submit', onSubmit);
