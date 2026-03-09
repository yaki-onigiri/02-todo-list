# Dev Log

## 2026-03-09

-----

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

-----

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

-----
