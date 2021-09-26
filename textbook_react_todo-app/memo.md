## ローカルで使えるモックサーバーを用意・起動

Node.js のライブラリ`JSON Server`を利用する。WebAPI テストなどで活用できる簡易サーバー。

```bash
yarn add json-server --dev # 開発時のみ必要なので --dev をつける
```

今回は[db.json](./db.json)をデータとして利用する。
モックサーバーを起動する

```bash
npx json-server --watch db.json --port 3100
```

`--watch`オプションにより`db.json`の更新が監視されるため、TODO が更新されると`db.json`も更新される。

## モックサーバーと通信できるようにする

`GET`や`POST`の HTTP リクエストを利用してサーバーとのデータのやり取りを行える Node.js ライブラリ`axios`を用意する。

```bash
yarn add axios
```

js 内では以下のようにデータ取得できる。

```js
import axios from "axios";
axios.get("http://localhost:3100/todos");
```

axios は Ajax 通信を楽に行えるライブラリ。`Promise`をベースとしており、`async/await`と組み合わせて利用すると、シンプルに記述できる。

```js
// axiosの例
import axios from "axios";
export default function App() {
  const fetchData = async () => {
    const response = await axios.get("https://example.com/data");
    return console.log(response.data);
  };
  fetchData();
  return <h1>Hello React!!<h1/>;
}
```

## TODO に一意な ID を付与できるようにする

Node.js のライブラリ`ulid`により、ソート可能かつランダムな ID を生成できる。

```bash
yarn add ulid
```

使い方は以下の通り。

```js
import {ulid} from `ulid`
ulid()
```

## TODO アプリ開発全体の流れ

1. モックサーバーと通信して TODO を取得する
1. TODO 一覧を状態（完了/未完了）別に表示させる
1. タイトルと TODO リストをコンポーネント化する
1. モックサーバーと通信する`todos.js`を作成する
1. TODO を取得、追加、更新、削除するカスタムフック`useTodo()`を作成する
1. TODO を`useTodo()`カスタムフックから取得する
1. 新規 TODO の追加機能を実装する
1. TODO リストのアイテムに設置したボタンの機能を実装する
1. コンポーネントごとに別ファイルに切り分ける

※ 書籍 CHAPTER 7 ではさらに`Chakra UI`を利用してデザインを組み込んでいく

## Chakra UI について

`Chakra UI`は、カスタマイズ可能な React UI コンポーネントライブラリ。
概要は参考書の P334~を参照。
`emotion`と`framer-motion`に依存しているため、一緒にインストールする。

```bash
yarn add @chakra-ui/react @emotion/react@^11 \
@emotion/styled@^11 framer-motion@^4
```

あらかじめインストールすることで`Chakra UI icons`も利用できる。

```bash
yarn add @chakra-ui/icons
```
