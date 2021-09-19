// 変数定義はletかconst。varはブロック外でも使用できてしまう
{
  var a = 0;
}
console.log("a = " + a);

// テンプレートリテラルはバッククォートのみ。
var b = 1;
console.log(`b = ${b}`);
console.log("b = ${b}");

// 四則演算に加え累乗がある。
console.log("2 ** 3 = " + 2 ** 3);

// 一般的な等価演算子は型が異なってもセーフになってしまうので、イコールを1つ加えた「厳密等価演算子」を使うべき
console.log("(3 == \"3\")  -> ", 3 == "3");
console.log("(3 == \"3\")  -> ", 3 === "3");

// null == undefined が true なのを利用すれば、「nullもしくはundefined」を片方だけで書ける。
var c = null;
console.log(c === null || c === undefined);
console.log(c == undefined);

// もしくは、Nullish coalescing Opeartor「??」を使うことで「nullもしくはundefinedのときだけ代わりの値」というようにできる
var d1 = null, d2 = "hoge";
console.log(d1 ?? "d1 is null");
console.log(d2 ?? "d2 is null");

// 関数の書き方は3種類
function e1(x) {
  return x;
}

const e2 = function (x) {
  return x;
}

const e3 = (x) => {
  return x;
};
console.log(`e1:${e1(1)} e2:${e2(1)} e3:${e3(1)}`);

// アロー関数はさらに省略できる。引数が1つの場合は()を、中身がreturnのみの場合は{}とreturnをセットで省略。
//{}を消すことで暗黙でreturnさせるというイメージなので、returnだけ消して{}を残してしまうと何もreturnされずundefinedになってしまう。厄介な論理エラーになりうる。
const e4a = x => x;
console.log("e4a:", e4a(1));

const e4b = x => { x };
console.log("e4b:", e4b(1));



// 可変長引数（残余引数）。配列として入ることに注意。
const f = (a, b, ...rest) => rest;
console.log("f: ", f(1, 2, 3, 4, 5));

// 分割代入。pythonの「a, b = 1, 2」みたいなイメージ。
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// オブジェクトから欲しいプロパティだけ取るということもでき、Reactでは必要なpropsだけ使うために良く用いられる。
let props = { g1: "hoge", g2: "fuga", g3: "piyo" };
const g = ({ g1, g2 }) => g1 + g2; // ここの()の中で「g1, g2だけ使う」ことを表している
console.log("g: ", g(props));

// if, switch, for, while, do_while　は普通

// for in はオブジェクトのプロパティを走る。順番は不定
for (let key in props) console.log(`${key}: ${props[key]}`);

// for ofは反復可能オブジェクト（配列とか）を順番通りに処理。pythonのfor inみたいな感じ
for (let elem of [1, 2, 3]) console.log(elem);

/* ------------------------ 配列 ------------------------ */
console.log("\n---------- 配列 ----------");
// 範囲外はundefinedを返す
let arr = [3, 1, 4, 15];
console.log(arr[5]);

// 配列であるかの判定はクラスメソッド Array.isArray() を使う
console.log(Array.isArray(arr));
console.log(Array.isArray(props));

// 特定要素のindexを .indexOfメソッドで取得。ない場合は-1を返す。
console.log(arr.indexOf(3));

// 特定要素を含むかどうかを .includesメソッド
console.log(arr.includes(12));

// 要素数はlengthプロパティ
console.log(arr.length);

// .toStringメソッドで文字列へ。区切り文字はカンマで固定っぽい。joinの下位互換っぽいが…
console.log(arr.toString());

// 配列の連結は .concatメソッドもしくはスプレッド構文で。スプレッド構文は「外側のカッコを除く」イメージ。配列の複製に便利。
console.log(arr.concat(arr));
console.log([...arr, ...arr]);
let arr_copy = [...arr]; // 複製

// .joinもある
console.log(arr.join(":"));

// .sortは破壊的。また文字列としてソートするので、数字の場合は明示的に比較関数を渡す。
arr.sort();
console.log(arr);
console.log(arr.sort((a, b) => a - b));

// .reverseで逆順に
arr.reverse();
console.log(arr);

// popで最後尾、shiftで先頭を削除。削除した要素を返す。
arr_copy = [...arr];
console.log(arr_copy.pop(), arr_copy);
console.log(arr_copy.shift(), arr_copy);

// .spliceで特定indexから特定要素数を削除し、第３引数以降のもので置き換える。
arr_copy = [...arr];
console.log(arr_copy);
console.log(arr_copy.splice(1, 2, "a", "b"), arr_copy);

// pop, shiftの反対で追加したい場合はpush, unshiftを使う。追加後の要素数を返す。
console.log(arr_copy.push("c"), arr_copy);
console.log(arr_copy.unshift("d"), arr_copy);

// .flatメソッドで多次元配列をflattenできる。引数分だけ外から行う。非破壊
console.log([[[1, 2], 3], [4]].flat());

// .forEachメソッドでfor ofと似たことができるが、こちらはindexやarray全体も内部で利用できて高級
// またこの例のようにforEachは引数として関数を受け取っているが、この関数のことをコールバック関数という。一方forEach側は高階関数と呼ぶ。
arr = [3, 1, 4, 1, 5];
console.log("arr = ", arr);
arr.forEach((value, index, array) => {
  console.log(value, index, array);
});

// .mapメソッドはforEachを限定的にしたもので、コールバック関数の戻り値で構成される配列を返す。引数はforEachと同じ
console.log(
  arr.map((value, index) => value + index)
);

// .filterメソッドはコールバック関数がtrueの要素だけ抜き出した配列を返す。
console.log(
  arr.filter(value => value > 1)
);

// .findメソッドはコールバック関数がtrueになる最初の要素を返す。つまり.filterの先頭ということ。無い場合undefinedを返す。
// .findIndexは.findで要素の代わりにindexを返す。無い場合は-1を返す。
console.log(
  arr.find(value => value > 3),
  arr.findIndex(value => value > 3)
);

// .everyはコールバック関数の論理積を返す。.someは論理和を返す。pythonでいうallとanyっぽい感じ。
console.log(
  arr.every(value => value > 0),
  arr.some(value => value >= 5)
);

// .reduceはある変数（ここではsum）に対しコールバック関数により順次操作を加えた結果を返す。
// これまでと引数が異なり、コールバック関数は先頭にその変数を取る。またコールバック関数の後ろに初期値（ここでは0）を取る。
console.log(
  arr.reduce((sum, value, index, array) => sum + value, 0),
  arr.reduce((str, value) => " " + str + value, "")
);

/* ------------------------ オブジェクト ------------------------ */
console.log("\n---------- オブジェクト ----------");
// 変数を利用してプロパティ指定できる。その際その変数名をそのままkey名にする場合は省略記法が使える
let age = 20;
let obj1 = { age: age }, obj2 = { age }; // 内容は同じ
console.log(obj1, obj2);

// 基本はドット記法でアクセスするが、ブラケット記法を使わざるを得ない場合もある
let obj3 = { "hoge-fuga": "piyo" };
console.log(obj3["hoge-fuga"]); // ハイフンがあるのでドットはダメ

// constのオブジェクトでもプロパティは変更可。全体を変えることはできない。
const obj4 = { x: 10, y: 20 };
obj4.x = 20;
console.log(obj4);
// obj4 = { x: 10, y: 10 };

// プロパティの削除はdelete演算子（関数やメソッドではない）を利用
delete obj4.x;
console.log(obj4);

// スプレッド構文でマージできる。ここでも「外側の括弧を除く」イメージ
let obj = { ...{ A: 1, B: 2 }, ...{ C: 3, D: 4 } };
console.log(obj);
// さらに分割代入やレスト構文も使える。分割代入ではkeyと同じ定数名を使う。またrestには残りのオブジェクトが入る
let { A, B, ...rest } = obj;
console.log(A, B, rest);

// クラスメソッド Object.keys(), .values(), .entries() でそれぞれ key, value, [key, value] の配列が得られる
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));

/* ------------------------ モジュール ------------------------ */
console.log("\n---------- モジュール ----------");
// 名前付きエクスポート/インポートとデフォルトエクスポート/インポートがある。
// 後者はファイル全体で1つのモジュールというイメージ

// 名前付きインポート
import { var1, func1, var2, func2 } from "./module1.js";
console.log(var1, func1());
console.log(var2, func2());

// asでエイリアス指定ができる
import {
  var1 as var11,
  var2 as var22
} from "./module1.js";
console.log(var11, var22);

// オブジェクトとしてまとめてインポートできる。この場合{}は不要
import * as Module1 from "./module1.js";
console.log(Module1);

// デフォルトインポート。1つだけなので{}は不要で、名前も変えられる。
import func33 from "./module2.js";
console.log(func33());

// export ... from ... とすると再エクスポートできる。複数のモジュールからのエクスポートをまとめたモジュールの作成に利用される。
// 上のimportをそのままexportにすればOK

// モジュールを利用しているjsをHTMLファイルから呼び出す際、type属性をmoduleにする
// <script type="module" src="./module1.js"> </script>

/* ------------------------ 非同期処理 ------------------------ */
console.log("\n---------- 非同期処理 ----------");

// setTimeoutとsetIntervalは非同期処理なので、順番が前後する場合がある。記述した行で「予約を入れてすぐ次の行に移る」というイメージ。
console.log("1");
setTimeout(() => { console.log("2") }, 100);
console.log("3");

// Promiseオブジェクト。テキストは意味不明なので↓を見る
// https://qiita.com/cheez921/items/41b744e4e002b966391a


// 以下のように書くことで、func_1の後にfunc_2が実行されることが保証される。これはresolve()を受けてから.thenが実行されるため。
// ちなみにPromiseを作った時点でカウントが始まる。thenはあくまで終了後の動作を指定するもの。

// let func_1 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log(1);
//     resolve();
//   }, 1000);
// });

// let func_2 = () => setTimeout(() => console.log(2), 500);

// func_1.then(() => func_2());


// 複数のPromiseの全て/1つが終わった後に別の関数を実行したい場合、クラスメソッド Promise.all, .race を用いる（後者は競争のイメージ？）。
// raceでも残りの関数が破棄されるわけではない。

// let func1000 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log(1000);
//     resolve();
//   }, 1000);
// });


// let func500 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log(500);
//     resolve();
//   }, 500);
// });

// Promise.all([func1000, func500]).then(() => console.log("next"));

// async, awaitを使うとさらに楽に書ける
// awaitはPromiseオブジェクトの前につけることで、そのPromiseのresolveまでその場で待機してくれる。asyncは中でawaitを使う関数の頭につける
// ただし下の例ではx, yそれぞれで止まるので、合計3000ms待つことになる（allを使う場合は同時に進むので2000msで済む）。
// すなわち良くも悪くも同期処理的になるということ。
let outerFunc = async () => {
  let x = await new Promise((resolve) => {
    setTimeout(() => {
      console.log("x");
      resolve("x");
    }, 1000);
  });

  let y = await new Promise((resolve) => {
    setTimeout(() => {
      console.log("y");
      resolve("y");
    }, 2000);
  });

  console.log(x + y);
}

outerFunc();