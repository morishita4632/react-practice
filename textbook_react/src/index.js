import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/*------------------------- Chap.2 -------------------------*/
// {}とreturnを省略できるが、可読性が下がる&ステート管理時に結局必要になるので非推奨
const App1 = () => {
  return ( // returnの中は1要素だけ。複数入れたい場合は外側をdivなどで囲む
    <div className="App1"> {/* classではなくclassNameを用いる */}
      <h3>App1</h3>
      <li>hoge</li>
      <li>
        fuga<br /> {/* JSXでは空要素の閉じスラッシュが必須 */}
        fuga2
      </li>
      <li>piyo</li>
    </div>
  );
}

// フラグメントを利用すれば余計なノードを出力せず複数要素をまとめられる
const App2 = () => {
  return (
    <>
      <h3>App2</h3>
      <li>hoge</li>
      <li>fuga</li>
    </>
  );
}

// styleはJSのオブジェクトで与える。外側の括弧は「JSを書く」合図。内側はオブジェクト。
// 中身のオブジェクトだけ別のところで定義するのがよろしい。
// このfontSizeのようにピュアな数値は自動的にpxがつく。別の単位（%など）の場合は文字列で与える。
// ただしstyle属性でスタイリングは非推奨で、普通にclassNameとcssでやるべき。
const App3 = () => {
  return (<>
    <h3>App3</h3>
    <h1 style={{ fontSize: 16, height: "80%", color: "red" }}>hoge</h1>
  </>);
}

// 入力値がstateで制御されていない"非制御コンポーネント"の場合、value属性で指定した文字列をユーザ側で変更できない。defaultValueを使えはOK。チェックボックスなども同様
const App4 = () => {
  return (<>
    <h3>App4</h3>
    <input type="text" value="value" />
    <input type="text" defaultValue="defaultValue" /><br />
    <input type="checkbox" checked /> checked
    <input type="checkbox" defaultChecked /> defaultChecked
  </>);
}

// propsは親コンポーネントから子コンポーネントへ渡される属性値のこと
// まず親は子を呼ぶ際にattributeで値を渡す（name="hoge"）
// 子はオブジェクトとしてpropsを受け取り、中で利用できる。
// 今回はnameしか使わないので分割代入も使える。
const App5Chi1 = (props) => {
  return <p>Hello, {props.name}</p>
}

const App5Chi2 = ({ name }) => {
  return <p>Hello, {name}</p>
}

const App5Par = () => {
  return (
    <>
      <h3>App5</h3>
      <App5Chi1 name="child1" />
      <App5Chi2 name="child2" />
    </>
  );
}

// stateを使うにはまず import React, { useState } from 'react'; する。
const App6 = () => {
  // コンポーネント内で const [状態変数, 状態変更関数] = useState(初期状態); で定義
  // 状態変数を更新する際は直接代入ではなく状態変更関数を利用する必要がある
  // ここのuseStateがReact Hooksの一つである
  const [liked, setLiked] = useState(false);

  // イメージ的には liked = !liked だが、これを setLiked(!liked)と書かないといけない
  // setLikedとレンダリングが紐づいているのかな？
  const toggleLiked = () => setLiked(!liked);

  return (<>
    <h3>App6</h3>
    <button onClick={toggleLiked}>{liked ? "いいね済" : "いいね前"}</button>
  </>);
}

// カウントアプリの練習。
const App7 = () => {
  const [count, setCount] = useState(0);

  const addCount = () => setCount(count + 1);
  const subCount = () => setCount(count - 1);
  const resetCount = () => setCount(0);

  return (<>
    <h3>App7</h3>
    <button onClick={subCount}>-</button>
    <div style={{ display: "inline-block", width: "30px", textAlign: "center" }} >{count}</div>
    <button onClick={addCount}>+</button>
    <button onClick={resetCount}>Reset</button>
  </>);
}

/*------------------------- Chap.3 -------------------------*/
// 入力値をリアルタイムに表示
const App8 = () => {
  const [name, setName] = useState("○○");

  const handleOnChange = (event) => setName(event.target.value);

  return (<>
    <h3>App8</h3>
    <input type="text" onChange={handleOnChange} />
    <p>こんにちは、{name}さん</p>
  </>);
}

// カウントアプリ。ただし表示部分を子コンポーネントとする
const App9Chi = (props) =>
  <p>{props.name}：{props.count}</p>

const App9Par = ({ name }) => {
  const [count, setCount] = useState(0);

  const addCount = () => setCount(count + 1);
  const subCount = () => setCount(count - 1);
  const resetCount = () => setCount(0);

  return (<>
    <App9Chi name={name} count={count} />
    <button onClick={subCount}>-</button>
    <button onClick={addCount}>+</button>
    <button onClick={resetCount}>Reset</button>
  </>);
}

/*------------------------- Chap.4 -------------------------*/
/*ログイン・ログアウトボタン。
  ・if文で表示コンポーネントを切り替える例
  ・propsで関数を渡す
  if文は式（値を返すもの）ではないのでJSX内で{}中で直接利用できない。
  代わりに関数（=式、ここではApp10）の中でifを使えばOK
  【整理】
  ・タグの内側でJSを使いたいとき、{}で囲む
  ・{}内には式（関数実行や変数）が入る。
*/
const App10Login = ({ toggleIsLoggedIn }) => {
  return <button onClick={toggleIsLoggedIn}>ログイン</button>
}

const App10Logout = ({ toggleIsLoggedIn }) => {
  return <button onClick={toggleIsLoggedIn}>ログアウト</button>
}

const App10 = () => {
  const [isLoggedIn, setIsLoggedInState] = useState(false);
  const toggleIsLoggedIn = () => {
    setIsLoggedInState(!isLoggedIn);
  }
  if (isLoggedIn) {
    return <App10Logout toggleIsLoggedIn={toggleIsLoggedIn} />
  } else {
    return <App10Login toggleIsLoggedIn={toggleIsLoggedIn} />
  }
}

// 上の例のように関数で囲めばJSX内でifが使える。そこで即時関数で包めば直接ifを使っている感覚で書ける
// ただし可読性が下がる場合がある
const App11 = () => {
  const isReact = true;
  return (<>
    <h3>App11</h3>
    <p>{(() => {
      if (isReact) {
        return "Hello, React!";
      } else {
        return "Hello!";
      }
    })()}</p>
  </>)
}

// そこで三項演算子を使えばスマート。元々式なので小細工がいらない
const App12 = () => {
  const isReact = true;
  return (<>
    <h3>App12</h3>
    <p>{isReact ? "Hello, React!" : "Hello!"}</p>
  </>)
}

/*条件に応じて表示or非表示、という場合は論理演算子でシンプルに書ける。
  &&でtrueのときのみ、　||でfalseのときのみ右辺を返す。
  P28-29を参照。もともと&&, ||は右辺は論理値である必要がない。
  またJSX内では論理値は表示されないので、true||hoge　で「1」が表示されることはない。
*/
const App13 = () => {
  const isReact = true;
  return (<>
    <h3>App13</h3>
    {isReact && <p>Hello, React!!</p>}
  </>)
}
const App14 = () => {
  const isReact = true;
  return (<>
    <h3>App14</h3>
    {isReact || <p>Hello, React!!</p>}
  </>)
}

/*mapで反復描画
  反復して生成する要素には一意なkey属性をつけるというルールがある。これはReactの「更新部分だけ再描画する」という性質のため。要素の追加・削除時にkeyがあることで最小限の再描画で済む。
  したがってindexを利用することはできるが非推奨。
  https://zenn.dev/luvmini511/articles/f7b22d93e9c182

  要素の配列は、単純に要素を並べたものとして描画される。
*/
const numbers = [2, 4, 6]

const App15 = () => {
  const items = numbers.map((item) =>
    <li key={item}>{item}</li>
  );
  return (<>
    <h3>App15</h3>
    <ul>{items}</ul>
  </>)
}

// イベント処理。イベントオブジェクトを受け取ることができる。
const handleChange = (e) => {
  console.log(e.target.value);
}
const App16 = () => {
  return <>
    <h3>App16</h3>
    <input type="text" defaultValue="" onChange={handleChange} />
  </>;
}

// 入力フォーム & ボタンクリックで入力内容を反映
const App17 = () => {
  // 入力中テキスト
  const [inputText, setInputText] = useState("");
  // 表示テキスト
  const [text, setText] = useState("React");

  // 入力イベント
  const handleChange = (e) => setInputText(e.target.value);
  // ボタンイベント
  const handleClick = () => {
    setText(inputText);
    setInputText("");
  }

  return (<>
    <h3>App17</h3>
    <p>I love {text}!</p>
    <input type="text" value={inputText} onChange={handleChange} />
    <input type="button" value="入力" onClick={handleClick} />
  </>)
}

// セレクトボックス & 内容をリアルタイムで反映
// option内のvalue属性がe.target.valueに送られる
const App18 = () => {
  const [selectedValue, setSelectedValue] = useState("HTML");
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  }
  return (<>
    <h3>App18</h3>
    <p>現在値：<b>{selectedValue}</b></p>
    <select value={selectedValue} onChange={handleChange}>
      <option value="HTML">HTML</option>
      <option value="CSS">CSS</option>
      <option value="JS">JS</option>
    </select>
  </>)
}

// 上のセレクトボックスをmapでリファクタリング
// valuesの段階でidまでつけておくことで、mapのkey属性に利用できる。
const values19 =
  [{ id: 1, item: "HTML" }, { id: 2, item: "CSS" }, { id: 3, item: "JS" }];

const App19 = () => {
  const [selectedValue, setSelectedValue] = useState(values19[0].item);
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  }
  return (<>
    <h3>App19</h3>
    <select value={selectedValue} onChange={handleChange}>
      {values19.map(
        (value) => <option value={value.item} key={value.id} >{value.item}</option>
      )}
    </select>
  </>)
}

/*  ラジオボタン
    labelタグ内にinputと生テキストを入れることで、それらを紐づけられる
    するとテキスト部をクリックしてもinputをクリックしたことになり、操作性が増す
*/
const values20 = [{ id: 1, color: "赤" }, { id: 2, color: "青" }, { id: 3, color: "黄" }];

const App20Item = (props) =>
  <label>
    <input
      type="radio" value={props.value}
      checked={props.checked}
      onChange={props.onChange} />
    {props.value}
  </label>

const App20 = () => {
  const [selectedValue, setSelectedValue] = useState(values20[0].color);
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  }
  return (<>
    <h3>App20</h3>
    <p>現在値：{selectedValue}</p>
    {values20.map((elem) =>
      <App20Item
        key={elem.id}
        value={elem.color}
        checked={elem.color === selectedValue}
        onChange={handleChange}
      />
    )}
  </>)
}


/*  チェックボックス
    「現在の値」が複数になり得るので配列orオブジェクトで管理する。
    今回は配列で。
    ※ map内のkeyを忘れずに
*/
const values21 = [{ id: 1, item: "マウス" }, { id: 2, item: "モニター" }, { id: 3, item: "キーボード" }];

const App21Item = (props) => <><label>
  <input type="checkbox" value={props.value} checked={props.checked}
    onChange={props.onChange} />
  {props.value}
</label></>

const App21 = () => {
  const [checkedValues, setCheckedValues] = useState([]);
  const handleChange = (e) => {
    const val = e.target.value;
    if (checkedValues.includes(val))
      setCheckedValues(checkedValues.filter((item) => item !== val));
    else
      setCheckedValues([...checkedValues, val]);
  }
  return (<>
    <h3>App21</h3>
    <p>現在値：{checkedValues.join(", ")}</p>
    {values21.map((elem) =>
      <App21Item key={elem.id} value={elem.item}
        checked={checkedValues.includes(elem.item)} onChange={handleChange} />
    )}
  </>);
}

/*
    同じものをオブジェクト管理で作る。
    《重要》stateは 非破壊処理=新しいオブジェクト にしないと更新判定がされず、再描画が走らない
      https://gotohayato.com/content/509/
      また逆に更新判定がされた場合は関連する定数も更新される。よってこの例の「現在値」の中身をreturnの前に新しい変数として定義しても良い（むしろ見やすいので推奨）
*/
const App22Item = (props) => <><label>
  <input type="checkbox" value={props.value} checked={props.checked}
    onChange={props.onChange} />
  {props.value}
</label></>

const App22 = () => {
  const [checkedValues, setCheckedValues] = useState({});
  const handleChange = (e) => {
    // checkedValues[e.target.value] = e.target.checked;
    // setCheckedValues(checkedValues);
    setCheckedValues({ ...checkedValues, [e.target.value]: e.target.checked })
  };

  return (<>
    <h3>App22</h3>
    <p>現在値：{(() => {
      let tmp = Object.entries(checkedValues);
      // tmp = tmp.filter((entry) => entry[1]);
      // tmp = tmp.map((entry) => entry[0]);
      tmp = tmp.reduce((pre, elem) => {
        elem[1] && pre.push(elem[0]);
        return pre;
      }, []);
      tmp = tmp.join(", ");
      return tmp
    })()
    }
    </p>
    {values21.map((elem) =>
      <App22Item key={elem.id} value={elem.item}
        checked={checkedValues[elem.item]} onChange={handleChange} />
    )}
  </>);
}



/*------------------------- Chap.5 -------------------------*/
/*  カウンター & フォーム
    useStateの例。また複数Stateをオブジェクトで管理する練習。
    だが今回はcountとnameは独立しているので、本来は別々のuseStateを用いるべき。
    さらに言うとカウンターとフォームは別コンポーネントにすべき。
*/
const INITIAL_COUNT = 0, INITIAL_NAME = "JavaScript";
const App23 = () => {
  const [state, setState] = useState({
    count: INITIAL_COUNT,
    name: INITIAL_NAME
  });

  // スプレッド構文で新しいオブジェクトを作り、更新判定させる
  // setState内で引数として現在のstateを受け取ることもできる
  const increment = () => { setState({ ...state, count: (state.count + 1) }) };
  const decrement = () => { setState({ ...state, count: (state.count - 1) }) };
  const reset = () => { setState({ ...state, count: INITIAL_COUNT }) };

  const handleChange = (e) => {
    setState({ ...state, name: e.target.value });
  }

  return (<>
    <h3>App23</h3>
    <p>現在のカウント数：{state.count}</p>
    <p>countの初期値：{INITIAL_COUNT}</p>
    <input type="button" value="increment" onClick={increment} />
    <input type="button" value="decrement" onClick={decrement} />
    <input type="button" value="reset" onClick={reset} />
    <p>Hello, {state.name} !!</p>
    <p>nameの初期値：{INITIAL_NAME}</p>
    <input type="form" value={state.name} onChange={handleChange} />
  </>)
}


/*  useEffect
    副作用（Reactの管理外でのDOM更新・APIによるデータ取得など、UI構築以外の処理）の実行タイミングを制御する。「UI構築後に行われる処理」と理解してよい。
    useEffect(副作用関数, [依存変数配列]);
    配列内変数のいずれかに変化があった場合のみ副作用関数が実行される。
*/

// ページタイトルも更新されるカウンター
const App24 = () => {
  const [count, setCount] = useState(0);

  const increment = () => { setCount(count + 1) };
  const reset = () => { setCount(0) };

  useEffect(() => { document.title = count; }, [count]);

  return (<>
    <h3>App24</h3>
    <p>現在のカウント数：{count}</p>
    <input type="button" value="increment" onClick={increment} />
    <input type="button" value="reset" onClick={reset} />
  </>)
}

/*  useEffect
    setEffectに空配列を入れると、初回レンダリング時のみ副作用関数を実行できる。
    また副作用関数のreturnに関数を置くと、アンマウント時や副作用関数の再実行時に中身を実行できる。
    clearIntervalなどに使う。
*/

// 表示・非表示を切り替えられるタイマー
const App25Chi = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    // ここは引数で受け取らないとダメ。setIntervalは初回実行時の関数を引数ごとコピーするため、countは常に0になってしまう。
    // https://eight-bites.blog/2021/05/setinterval-setstate/
    setCount((count) => count + 1);
  }

  const callback = () => {
    const timer = setInterval(increment, 1000);
    return () => { clearInterval(timer) };
  }

  useEffect(callback, []);

  return <p>現在のカウント数：{count}</p>;
}

const App25 = () => {
  const [visible, setVisible] = useState(false);
  // infinite loop 云々というエラーが出たときはここの右辺に直接setを置いていないか確認
  const toggleVisible = () => setVisible(!visible);
  return <>
    <h3>App25</h3>
    <input type="button" value={visible ? "タイマーを非表示" : "タイマーを表示"}
      onClick={toggleVisible}
    />
    {visible && <App25Chi />}
  </>;
}

/*  React.memo
    メモ化によりレンダリングをスキップする。
    React.memo(親からpropsを受け取る子) としてラップすると、propsに差分があった場合のみ再レンダリングする。
    通常は親が再レンダリング->子も再レンダリングだが、メモを使えば実際にpropsが変わった子のみの再レンダリングで済む
*/
/*  2つのカウンター（子）を持つ親
    親がボタンとカウント数を管理し、子はカウント数を受け取って表示だけする。
    Consoleで再レンダリングされたボタンが確認できる。
    試しにReact.memoだけ削除すると、どちらかのボタンをクリックしただけで両方が再レンダリングされることがわかる。今回は軽いが、これが重いコンポーネントだった場合はパフォーマンスが下がる。
*/
const App26Chi = React.memo(({ text, count }) => {
  // console.log(text);
  return <p>{text}：{count} </p>
})

const App26 = () => {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  const incrementA = () => setCountA(countA + 1);
  const incrementB = () => setCountB(countB + 1);

  return <>
    <h3>App26</h3>
    <App26Chi text="A" count={countA} />
    <App26Chi text="B" count={countB} />
    <button onClick={incrementA}>Aボタン</button>
    <button onClick={incrementB}>Bボタン</button>
  </>
}

/*  React.useCallback
    上は親から変数を受け取る例だった。しかし関数を受け取る場合は、毎回再生成されてしまうので、うまくメモ化されない。そこで親側でuseCallbackで関数をラップする。
    （子側はさっきと同じく全体をReact.memoでラップ）
    useCallback(コールバック関数, [依存変数配列]) の形で、指定した変数が更新された場合のみ更新される関数を作れる。
*/
/*  2つのカウンター
    親はカウントを管理し、子（ボタン）にカウント更新関数を投げる
*/
const App27Chi = React.memo(({ counterState, buttonValue }) => {
  // console.log(buttonValue);
  return <button onClick={counterState}>{buttonValue}</button>
})

const App27 = () => {
  const [countStateA, setCountStateA] = useState(0);
  const [countStateB, setCountStateB] = useState(0);

  const countIncrementA = React.useCallback(
    () => setCountStateA(countStateA + 1), [countStateA]
  );
  const countIncrementB = React.useCallback(
    () => setCountStateB(countStateB + 1), [countStateB]
  );

  return <>
    <h3>App27</h3>
    <p>A：{countStateA}</p>
    <p>B：{countStateB}</p>
    <App27Chi counterState={countIncrementA} buttonValue="Aボタン" />
    <App27Chi counterState={countIncrementB} buttonValue="Bボタン" />
  </>
}

/*  useMemo
    コンポーネント云々に限らない単純なメモ化
    useMemo(()=>関数, [依存変数配列]) でメモ化関数が返る
*/
/*  2つのカウンターA,Bと、B^2の表示。ただし全てまとめて1コンポーネント。
    Aのインクリメント時にはB^2は再計算されないで欲しい。
    2乗の計算はわざと重くする。
*/

const App28Square = (param) => {
  const testData = [...Array(1000).keys()]; // これで連番が作れる
  testData.forEach(() => { console.log("ループ") });
  return param ** 2;
}

const App28 = () => {
  const [countStateA, setCountStateA] = useState(0);
  const [countStateB, setCountStateB] = useState(0);

  const incrementA = () => {
    setCountStateA(countStateA + 1);
    console.log("A");
  }
  const incrementB = () => {
    setCountStateB(countStateB + 1);
    console.log("B");
  }
  // ここでuseMemo
  const square = React.useMemo(() => App28Square(countStateB), [countStateB]);

  return <>
    <h3>App28</h3>
    <p>A：{countStateA} <button onClick={incrementA}>A</button> </p>
    <p>B：{countStateB} <button onClick={incrementB}>B</button> </p>
    <p>B^2 = {square}</p>
  </>
}

/*  React.useRef
    要素の参照を行うフックで、主にDOMへのアクセスに利用される。
    コンポーネント内で変数に値を保持することができるが、更新時に再レンダリングされないという点でuseStateと異なる。
    useRef(初期値) とするとオブジェクト {current:初期値} が返る。
    実際は useRef(null) の後に ref で関連付けることでDOM操作を可能にする。
*/
// ボタンをクリックするとフォーカスされるinput
const App29 = () => {
  const inputRefObject = React.useRef(null);
  const handleClick = () => {
    inputRefObject.current.focus();
  }
  return <>
    <h3>App29</h3>
    <input ref={inputRefObject} type="text" />
    <button onClick={handleClick}>フォーカス</button>
  </>
}

/*  setボタンを押すと反映されるフォーム
    ボタンを押すまでは内部的に保持だけしておき、押したタイミングでレンダリングさせたい。
    これをuseStateで保持すると、1文字変化ごとに再レンダリングが走ってしまう。
*/

const App30 = () => {

}

/*=====================================================*/
// 宣言の都合上最下部にrenderを書いている
ReactDOM.render(<>
  <h1>Chap.2</h1>
  <App1 />    <App2 />    <App3 />    <App4 />
  <App5Par />    <App6 />    <App7 />
  <h1>Chap.3</h1>
  <App8 />    <h3>App9</h3>
  <App9Par name="hoge" />    <App9Par name="fuga" />
  <h1>Chap.4</h1>
  <h3>App10</h3>    <App10 />    <App11 />    <App12 />
  <App13 />   <App14 />    <App15 />    <App16 />
  <App17 />   <App18 />   <App19 />  <App20 />  <App21 /> <App22 />
  <h1>Chap.5</h1>
  <App23 /> <App24 />  <App25 />  <App26 />  <App27 />  <App28 />
  <App29 />
</>, document.getElementById('root')
);