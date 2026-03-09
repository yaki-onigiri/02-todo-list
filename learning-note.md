# 学習メモ（2026-03-09）

‐‐‐‐‐

## 「querySelectorAll」

複数の要素を取得するメソッド

例：document.querySelectorAll("#todo-list li")

NodeListが返るため、forEachで処理できる

‐‐‐‐‐

## checkboxの状態取得

input.checked

true → チェックあり
false → チェックなし

‐‐‐‐‐

## localStorage

ブラウザにデータを保存できるようになりました。

保存
localStorage.setItem()

取得
localStorage.getItem()

削除
localStorage.removeItem()

‐‐‐‐‐

## filter機能の実装

ボタンを押すことで、完了／未完了タスクの表示を切り替える機能を実装しました。

### 使用した技術①

querySelectorAll()

複数の要素を取得するメソッドです。

例：　document.querySelectorAll("#todo-list li")

取得した要素を「forEach」で処理することで、
すべてのタスクに対して表示切替を行なうことができます。

### 表示の切り替え方法

「style.display」コードを使用します。

表示：todo.style.display = ""

非表示：todo.style.display = "none"

‐‐‐‐‐

## 編集機能を追加する

タスクをダブルクリックすることでダイアログを開き、その中でタスクを別のタスク名に編集できる機能を実装しました。

### 処理の流れ

・タスク（span）をダブルクリックする
・prompt で入力ダイアログを表示
・新しいタスク名を入力
・入力内容をチェック
・タスク名を更新
・localStorageへ保存

## 使用した主なコード

### ①　ダブルクリックイベント

span.addEventListener("dblclick", function(){...});
ダブルクリックされたときに実行されるイベントです。
（今回の場合は span をダブルクリックすることで処理が開始されます）

### ②　const newText = prompt("タスクを編集してください", span.textContent)

ここでダイアログ（prompt）が開いて入力ダイアログを表示します。

第2引数に「span.textContent」を指定することで、
「現在のタスク名」を初期値として表示できます。

### ③　if(newText === null) return

このコードで、タスクを編集する際（ prompt 時）にキャンセルした場合に「null」が返ってくるので、処理終了となります。

### ④　const trimmedText = newText.trim(); if(trimmedText === "") return

このコードで、入力された文字列の前後の空白を削除し、空なら編集しない機能が働きます。

### ⑤　span.textContent = trimmedText

このコードで、タスクの表示内容が更新されます。

### ⑥　saveTodos()

このコードで、タスクの変更内容を「localStorage」に保存されます。
