/*  サーバーとの通信用ファイル
    axiosでは以下のメソッドが利用できる
    ・get(URL, {params: queries}) 取得
    ・post(URL, newData)          追加
    ・delete(URL/id)              削除
    ・put(URL/id, modifyData)     更新
    各関数のreturnはthenで使える。
*/

import axios from "axios";
const todoDataUrl = "http://localhost:3100/todos";

// getで取得
export const getAllTodosData = async () => {
  const response = await axios.get(todoDataUrl);
  return response.data;
}

// postで追加
export const addTodoData = async (todo) => {
  const response = await axios.post(todoDataUrl, todo);
  return response.data;
}

// deleteで削除
export const deleteTodoData = async (id) => {
  await axios.delete(`${todoDataUrl}/${id}`);
  return id;
}

// putで更新
export const updateTodoData = async (id, todo) => {
  const response = await axios.put(`${todoDataUrl}/${id}`, todo);
  return response.data;
}