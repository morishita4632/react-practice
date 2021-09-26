import React, { useRef } from "react";
import { useTodo } from "../hooks/useTodo";
import { TodoTitle } from "./TodoTitle";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";

import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

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

  return <Container centerContent p={{ base: "4", md: "6" }} maxWidth="3xl">
    <TodoTitle title="TODO進捗管理" as="h1"
      fontSize={{ base: "2xl", md: "3xl" }}
    />
    <TodoAdd inputEl={inputEl} buttonText="TODOを追加"
      handleAddTodoListItem={handleAddTodoListItem}
      placeholder="ADD TODO" leftIcon={<AddIcon />}
    />

    <TodoList title="未完了TODOリスト" as="h2"
      todoList={inCompletedList}
      toggleTodoListItemStatus={toggleTodoListItemStatus}
      deleteTodoListItem={deleteTodoListItem}
      fontSize={{ base: "xl", md: "2xl" }}
    />

    <TodoList title="完了TODOリスト" as="h2"
      todoList={completedList}
      toggleTodoListItemStatus={toggleTodoListItemStatus}
      deleteTodoListItem={deleteTodoListItem}
      fontSize={{ base: "xl", md: "2xl" }}
    />
  </Container>

}

export default App;
