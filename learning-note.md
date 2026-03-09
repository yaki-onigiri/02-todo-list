# 学習メモ（2026-03-09）

ーーーーー

## 「querySelectorAll」

複数の要素を取得するメソッド

例：document.querySelectorAll("#todo-list li")

NodeListが返るため、forEachで処理できる

ーーーーー

## checkboxの状態取得

input.checked

true → チェックあり
false → チェックなし

ーーーーー

## localStorage

ブラウザにデータを保存できるようになりました。

保存
localStorage.setItem()

取得
localStorage.getItem()

削除
localStorage.removeItem()

ーーーーー

## filter機能の実装

ボタンを押すことで、完了／未完了タスクの表示を切り替える機能を実装しました。

### 使用した技術

querySelectorAll()

複数の要素を取得するメソッドです。

例：　document.querySelectorAll("#todo-list li")

取得した要素を「forEach」で処理することで、
すべてのタスクに対して表示切替を行なうことができます。

### 表示の切り替え方法

「style.display」コードを使用します。

表示：todo.style.display = ""

非表示：todo.style.display = "none"
