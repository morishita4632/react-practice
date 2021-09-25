// TODOの状態を管理するカスタムフック
import { useState, useEffect } from "react";
import { ulid } from "ulid";
import * as todoData from "../apis/todos";

export const useTodo = () => {
  const [todoList, setTodoList] = useState([]);

  // サーバからデータ取得
  useEffect(() => {
    todoData.getAllTodosData().then(
      // thenのコールバック関数は、元の関数のreturnを受け取れる
      (todo) => {
        // スプレッド構文を利用して更新判定にかける。また新しいTODOを上に持ってくるためreverseする
        setTodoList([...todo].reverse());
      }
    )
  }, []);

  /*  完了/未完了のトグル
      更新後のtodoItemを作成
      -> サーバに反映
      -> ローカル側のtodoItemも更新
      の順に処理
      （先にローカルを更新だとマズイのか？）
      thenの中ではtodos.jsで指定した返り値を受け取れる
  */
  const toggleTodoListItemStatus = (id, done) => {
    const todoItem = todoList.find((item) => item.id === id);
    const newTodoItem = { ...todoItem, done: !done };

    todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
      const newTodoList = todoList.map((item) =>
        item.id !== updatedTodo.id ? item : updatedTodo
      );
      setTodoList(newTodoList);
    })
  }

  const addTodoListItem = (todoContent) => {
    const newTodoItem = { content: todoContent, id: ulid(), done: false };
    // このreturnは何を返している？
    return todoData.addTodoData(newTodoItem).then((addTodo) => {
      setTodoList([addTodo, ...todoList]); // 追加したtodoを前に挿入
    });
  }

  const deleteTodoListItem = (id) => {
    todoData.deleteTodoData(id).then((deleteListItemId) => {
      const newTodoList = todoList.filter((item) =>
        item.id !== deleteListItemId
      );
      setTodoList(newTodoList);
    })
  }

  return {
    todoList, toggleTodoListItemStatus,
    addTodoListItem, deleteTodoListItem
  }
}
