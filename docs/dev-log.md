# Dev Log

-----

## 2026-03-09

### 実装①：完了タスク一括削除機能を追加

問題

チェックしたタスクが削除されない

原因

JavaScriptで使用していたIDと保存関数が違っていた

ID
taskList → todo-list

保存関数
saveTasks(); → saveTodos();

解決法

ID、関数名を既存コードに合わせて修正

学んだこと

既存コードに機能追加するときは、
変数名・ID・関数名を必ず確認すること

### 実装②：未完了タスク表示フィルター

機能

3つのボタンで表示を切り替える仕様にしました。

- すべて
- 未完了
- 完了

問題

フィルターボタンをクリックしても反応がありませんでした。

再現手順

1.TODOリストアプリを開く
2.タスクを追加する
3.「未完了」ボタンをクリックする
4.画面の表示が変わらない

原因

HTMLとJavaScriptのIDが一致していなかったことに気が付きました。

HTML

・filters-all
・filters-active
・filters-completed

JavaScript
・filter-all
・filter-active
・filter-completed

解決法

HTMLのIDをJavaScriptと同じ名前に修正したところ、反応が返ってきました。

学んだこと

JavaScriptの「 getElementById() 」は、
IDが1文字でも違うと要素を取得できません。

そのためIDなどを書き写す際はなるべく手打ちせず、
「Ctrl + C」キーでコピペすること。

### 実装③：タスクの編集機能を追加

機能

タスクをダブルクリックすることでダイアログを表示させ、その中でタスク名を編集できる機能を追加しました。

実装方法

①　span要素に`dblclick`イベントを設定し、
`prompt()`を使用して新しいタスク名を入力できるようにしました。

②　入力された文字列（prompt）は`trim()`で空白を削除し、
空文字の場合は更新しないように条件分岐を追加しました。

③　編集後は`saveTodos()`を実行し、
「localStorage」へ保存されるようにしました。

注意した点

指定された関数（createTodo）の中にコードを追加し、
既存のタスク生成処理に影響がないように実装しました。

学んだこと

`dblclick`イベントを使用することで、
「“要素をダブルクリックした”ときの処理」を実装できることを学びました。

-----

## 2026-03-10

### 実装①　フィルター状態を保存

機能

前回のタスクで指定した「すべて・完了・未完了」のフィルター状態を維持したまま保存する機能を実装しました。

実装方法

①　フィルターボタン押下時に現在のフィルターを保存。

currentFilter = "active";
localStorage.setItem("filter", currentFilter);

②　ページ読み込み時に保存されたフィルターを取得。

const savedFilter = localStorage.getItem("filter");

if(savedFilter){
  currentFilter = savedFilter;
  filterTodos(currentFilter);
}

発生した問題
フィルターが動作しないバグが発生しました。

原因
「 filterTodos("currentFilter"); 」と書いていたため、
“変数”ではなく“文字列”が渡されていたことが原因。

修正
ダブルクォーテーション（""）を消したことで解決。
「 filterTodos("currentFilter"); 」
 → 「filterTodos(currentFilter);」

学んだこと
変数を関数に渡す場合、クォーテーションを付けると文字列として扱われます。

変更したファイル
js/script.js

-----

## 2026-03-11

### 実装

①タスクのドラッグ＆ドロップによる並び替え機能を追加。
②ツール全体のレイアウト管理をしやすく修正。
③スマホ画面に対応するため、レスポンシブCSSを追加

実装内容

①

- li要素に draggable 属性を設定
- dragstart イベントでドラッグ対象を保持
- drop イベントでタスクを並び替え
- 並び替え後に localStorage を更新

②

- HTML、CSSに「container」を追加

③

- CSSに「@ media(max-width)」を用いて、それぞれのid,classなどに所定のコードを打ってスマホ画面でも使用しやすいようにする。

修正内容

①
saveTodos() のスペルミスを修正。

感想

①
「Drag and Drop API」を初めて使用したため理解に時間がかかったが、タスクの並び替えが実装できた。

②
「container」を使うとレイアウト管理がしやすい。

③
スマホ画面などに対応させる場合は「@ media」コードを使うことで、さまざまな画面に対応したレイアウトに変更できる。

-----
