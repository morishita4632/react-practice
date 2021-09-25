import React, { useRef } from "react";
import { useTodo } from "../hooks/useTodo";

// 見出しコンポーネント。タイトルと深さを受け取る。
const TodoTitle = ({ title, as }) => {
  if (as === "h1") return <h1>{title}</h1>
  if (as === "h2") return <h2>{title}</h2>
  return <p>{title}</p>
}

// TODOアイテムコンポーネント
const TodoItem = ({ todo }) =>
  <li>
    {todo.content}
    <button>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
    <button>削除</button>
  </li>

// todoの配列から<ul>を返すコンポーネント
const TodoList = ({ todoList }) =>
  <ul>
    {todoList.map((todo) => (
      <li key={todo.id}>
        {todo.content}
        <button>{todo.done ? "未完了" : "完了"}リストへ</button>
        <button>削除</button>
      </li>
    ))}
  </ul>

function App() {
  const { todoList, addTodoListItem } = useTodo();

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
    <textarea ref={inputEl} />
    <button onClick={handleAddTodoListItem}>+ TODOを追加</button>

    <TodoTitle title="未完了TODOリスト" as="h2" />
    <TodoList todoList={inCompletedList} />

    <TodoTitle title="完了TODOリスト" as="h2" />
    <TodoList todoList={completedList} />
  </>

}

export default App;
