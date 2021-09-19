// デフォルトエクスポート。ファイルごとに1つだけなので、宣言と同時にexportする場合は関数名（func3）は省略可。変数の場合は同時はできない（∵複数同時に作成できるため）。
export default function func3() {
  return 3;
}

// export default () => 3; // とも書ける