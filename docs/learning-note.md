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

---

## 2026-03-11

### ドラッグ＆ドロップ機能の実装

タスクの並び替えを行なうために、
『HTML Drag and Drop API』を使用して実装しました。

使用したイベントコード

- dragstart
ドラッグ開始時に実行されるイベント。

- dragover
ドロップ可能にするために、'event.preventDefault()' を記述しました。

- drop
ドラッグされた要素を指定位置に移動する処理を実装しました。

実装方法

1.li要素に 'draggable = true' を設定。
2.dragstart でドラッグ対象を保存。
3.dropイベントで 'insertBefore()' を並び替え。

学んだこと

- DOM操作で要素の順序を変更できる
- Drag and Drop APIの基本的な仕組み
- イベント移譲を使うことでイベント数を減らせる

### ツール全体のレイアウトを管理しやすくする

実装方法

HTML全体を div class="container" で囲むことで
CSSでレイアウトを管理しやすくしました。

### レスポンシブ対応

「@ media(max-width: ○○ px)」を使うことで、スマホ画面のときだけCSSを変更できるようにしました。

---

## 2026-03-12

### ドラッグ＆ドロップ機能の改善

タスク並び替えの際に、1度の操作では画面に反映されない煩わしさをなくすためにコードを一部書き換えました。

使用したコード

・ドラッグ開始
    li.addEventListener("dragstart", function(){
        draggedItem = li;
        li.classList.add("dragging");
    });

・ドラッグ終了
    li.addEventListener("dragend", function(){
        draggedItem = null;
        li.classList.remove("dragging");
    });

・ドロップ処理
    list.addEventListener("drop", function(e){
        e.preventDefault();
        const target = e.target.closest("li");
        if(!target || !draggedItem || draggedItem === target) return;
        const rect = target.getBoundingClientRect();
        const offset = e.clientY - rect.top;
        if (offset > rect.height / 2) {
            target.after(draggedItem);
            } else {
                target.before(draggedItem);
            }
        saveTodos();
    });

実装方法

    ①　タスク（li要素）に draggable = true を設定する

    ②　dragstart でドラッグしているタスクを draggedItem に保存

    ③　dragend でドラッグ状態を解除

    ④　dragover で preventDefault() を設定しドロップ可能にする

    ⑤　drop でドロップされた位置を取得

    ⑥　マウス位置（clientY）を基準に
        上半分 → before()
        下半分 → after()
    でタスクを並び替える

    ⑦　並び替え後に saveTodos() を実行して保存

### タスクの表示を整える

スマホ画面でツールを使用する際に、チェックボックスを表示する場所とタスク名を表示する場所がアンバランスであったため、修正しました。

使用したコード
＜JavaScript＞
    削除：const li = document.createElement("li");

    理由：ページ読み込み時に空の<li>を1つ作ってしまうコードであるため。

＜CSS＞（レスポンシブ内）

    削除：
    button {
        width: 50%;
    }
    
    理由：削除ボタンにも適用されてしまい、flexレイアウトが崩れる原因になってしまうため。

    加筆：

    .container{
        padding:15px;
    }

    #todo-input{
        width:100%;
        margin-bottom:10px;
    }

    #add-button,
    #clear-Button{
        width:100%;
        margin-top:8px;
    }

    .todo-item{
        display:flex;
        align-items:center;
        gap:10px;
    }

    .todo-item input{
        width:auto;
    }

    .todo-text{
        flex:1;
    }

    .todo-item button{
        width:auto;
    }

### タスク欄の一番下に「空のタスク」が残るバグを修正

使用したコード①

・function loadTodos(){

    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(function(todo){

        createTodo(todo.text, todo.completed);

    });
}

    ⇓（修正）

・function loadTodos(){

    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(function(todo){

        if(!todo.text || todo.text.trim() === "") return;　⇐このコードを追加

        createTodo(todo.text, todo.completed);

    });
}

これによって「""」「null」「undefined」などのからタスクを無視できます。

使用したコード②
・ function saveTodos 内のコードを加筆修正

    const text = li.querySelector("span").textContent;
    　　　⇓
    const text = li.querySelector("span").textContent.trim();　⇐trim()を追加
    if(text === "") return;　⇐ここを追加

このコードによって saveTodos() でも空文字を保存しないようにします。

### ダークモード機能の実装を追加

ダークモードを実装するために以下の仕組みを実装しました。

1．classList.toggle() を使って、body に dark クラスを付与
2．localStorage を使い、ダークモード状態を保存
3．ページ読み込み時に localStorage から状態を復元

使用したコード
＜CSS＞
    body.dark {
        background: #121212;
        color: #ffffff;
    }

＜JavaScript＞
    ①　darkModeToggle.addEventListener("click", function(){

        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        localStorage.setItem("darkMode", isDark);
    });

    ②　const savedDarkMode = localStorage.getItem("darkMode");

    if(savedDarkMode === "true"){
        document.body.classList.add("dark");
    }

## 2026-03-14

### UI/UX改善

１．『ドラッグ＆ドロップ』のときに、移動するタスクがどれか解りやすいように表示されるコードを書きました。

具体的な方法
ドラッグ中の要素には JavaScript 側で、`,dragging` クラスが付与されるため、そのクラスに対してスタイルを指定することで、見た目を変更できます。

    <CSS>
        .dragging {
            opacity: 0.5;
            /* 移動しているタスクを解りやすくする 処理 (26/03/14) */
            background: #e3f2fd;
            border: 2px dashed #2196f3;
        }

ポイント
JSがクラスを付ける ⇒ CSSで見た目変更

２．タスク追加時にアニメーションを付与することで、タスクを追加したイメージをもたせやすくしました。

`.todo-item` が生成されたタイミングで `animation` を実行し、タスクが追加されたことを視覚的にわかりやすくしました。

具体的な方法
CSS で`.todo-item`に `animation` を指定し、`@keyframes fadeIn` で動きを定義します。

    <CSS>
        .todo-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin: 10px 0;

            /* タスク追加時のアニメーションを追加 (26/03/14) */
            animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
            from{
                opacity: 0;（ ⇐ 最初は透明）
                transform: translateY(5px);（ ⇐ 少し下から）
            }
            to {
                opacity: 1;（ ⇐ 最後は表示）
                transform: translateY(0);（ ⇐ 最後は元の位置）
            }
        }

３．マウスカーソルを記述したタスクに合わせることで、タスクを浮かび上がらせる表現がされるようにしました。

    <CSS>
        li {
            margin-bottom: 10px;
            padding: 8px;
            background: #f9f9f9;
            border-radius: 5px;
            /* タスクを浮かび上がらせるエフェクトを付与 (26/03/14) */
            transition: transform 0.15s, box-shadow 0.15s;
        }

        /* タスクを浮かび上がらせるエフェクトを付与 (26/03/14) */
        li:hover{
            transform: translateY(-2px);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }

４．残りタスク数の表示を強調させました。

    <CSS>
        #task-count {
            font-weight: bold;
            margin-top: 15px;
        }

### アプリ完成として一区切りつけるための操作手順

① 【README】の最終チェック。
②　VS Codeターミナルにて
    １．git add . → ２．git commit -m"Complete TODO List app for portfolio" → ３．git push
の順番でコマンドを入力。
③　Git Hubにサインインして Pages 確認。
    問題なければアプリ完成。
