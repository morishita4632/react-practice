// TODOをリスト化するコンポーネント
import { TodoTitle } from "./TodoTitle";
import { TodoItem } from "./TodoItem";

export const TodoList = ({
  todoList, toggleTodoListItemStatus,
  deleteTodoListItem, title, as }) => <>
    {todoList.length !== 0 && <> {/* 空でないときのみ表示 */}
      <TodoTitle title={title} as={as} />
      <ul>
        {todoList.map((todo) => (
          <TodoItem todo={todo}
            key={todo.id}
            toggleTodoListItemStatus={toggleTodoListItemStatus}
            deleteTodoListItem={deleteTodoListItem}
          />
        ))}
      </ul>
    </>
    }
  </>