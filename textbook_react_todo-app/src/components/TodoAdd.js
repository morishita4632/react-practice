// TODOを新規追加するコンポーネント
export const TodoAdd = ({ buttonText, inputEl, handleAddTodoListItem }) => <>
  <textarea ref={inputEl} />
  <button onClick={handleAddTodoListItem}>{buttonText}</button>
</>