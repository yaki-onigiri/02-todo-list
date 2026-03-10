# 学習メモ

## 2026-03-09

### 「querySelectorAll」

複数の要素を取得するメソッド

例：document.querySelectorAll("#todo-list li")

NodeListが返るため、forEachで処理できる

### checkboxの状態取得

input.checked

true → チェックあり
false → チェックなし

### localStorage

ブラウザにデータを保存できるようになりました。

保存
localStorage.setItem()

取得
localStorage.getItem()

削除
localStorage.removeItem()

### filter機能の実装①

ボタンを押すことで、完了／未完了タスクの表示を切り替える機能を実装しました。

#### 使用した技術①

querySelectorAll()

複数の要素を取得するメソッドです。

例：　document.querySelectorAll("#todo-list li")

取得した要素を「forEach」で処理することで、
すべてのタスクに対して表示切替を行なうことができます。

#### 表示の切り替え方法

「style.display」コードを使用します。

表示：todo.style.display = ""

非表示：todo.style.display = "none"

### 編集機能を追加する

タスクをダブルクリックすることでダイアログを開き、その中でタスクを別のタスク名に編集できる機能を実装しました。

#### 処理の流れ

・タスク（span）をダブルクリックする
・prompt で入力ダイアログを表示
・新しいタスク名を入力
・入力内容をチェック
・タスク名を更新
・localStorageへ保存

### 使用した主なコード

#### ①　ダブルクリックイベント

span.addEventListener("dblclick", function(){...});
ダブルクリックされたときに実行されるイベントです。
（今回の場合は span をダブルクリックすることで処理が開始されます）

const newText = prompt("タスクを編集してください", span.textContent)

ここでダイアログ（prompt）が開いて入力ダイアログを表示します。

第2引数に「span.textContent」を指定することで、
「現在のタスク名」を初期値として表示できます。

if(newText === null) return

このコードで、タスクを編集する際（ prompt 時）にキャンセルした場合に「null」が返ってくるので、処理終了となります。

const trimmedText = newText.trim(); if(trimmedText === "") return

このコードで、入力された文字列の前後の空白を削除し、空なら編集しない機能が働きます。

span.textContent = trimmedText

このコードで、タスクの表示内容が更新されます。

saveTodos()

このコードで、タスクの変更内容を「localStorage」に保存されます。

---

## 2026-03-10

### フィルター状態のデータをブラウザに保存する仕組み

・選択中のフィルター状態を保存
localStorage.setItem("filter", currentFilter);

・ページ読み込み時に復元
const savedFilter = localStorage.getItem("filter");

・削除
localStorage.removeItem("filter");

ポイント：技術単位でまとめることです。

### 配列を保存する方法

「localStorage」は文字列しか保存できないため、「JSON」に返還する必要があります。

・保存
localStorage.setItem("todos", JSON.stringify(todos));

・取得
const todos = JSON.parse(localStorage.getItem("todos")) || [];

### querySelectorAll + forEach

複数の要素を取得して処理する方法です。

例
document.querySelectorAll("#todo-list li").forEach(function(li){
    // 処理
});

### filter機能の実装②

チェックボックス状態を取得するコードです。
const completed = checkbox.checked;

表示切替
todo.style.display = "none";
