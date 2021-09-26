import React, { useRef } from "react";
import { useTodo } from "../hooks/useTodo";
import { TodoTitle } from "./TodoTitle";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";

function App() {
  const { todoList, addTodoListItem, toggleTodoListItemStatus, deleteTodoListItem } = useTodo();

  // TODO入力フォーム用のrefオブジェクト
  const inputEl = useRef(null);

  const handleAddTodoListItem = () => {
    if (inputEl.current.value === "") return;
    addTodoListItem(inputEl.current.value);
    inputEl.current.value = "";
  }

  const inCompletedList = todoList.filter(todo => !todo.done);
  const completedList = todoList.filter(todo => todo.done);

  return <>
    <TodoTitle title="TODO進捗管理" as="h1" />
    <TodoAdd inputEl={inputEl} buttonText="+ TODOを追加"
      handleAddTodoListItem={handleAddTodoListItem} />

    <TodoList title="未完了TODOリスト" as="h2"
      todoList={inCompletedList}
      toggleTodoListItemStatus={toggleTodoListItemStatus}
      deleteTodoListItem={deleteTodoListItem}
    />

    <TodoList title="完了TODOリスト" as="h2"
      todoList={completedList}
      toggleTodoListItemStatus={toggleTodoListItemStatus}
      deleteTodoListItem={deleteTodoListItem}
    />
  </>

}

export default App;
