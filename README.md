jQuery TabBar
======================
HTML/Javascript/CSSでタブバーを生成するjQueryプラグインです。  
サンプルは[こちら](http://180.235.252.88/github/tabbar/sample.html)。
Webkit系のブラウザで動作します。

必要なjQueryバージョン: 1.7+

使い方
---
### Step1 ###
JSファイルとCSSファイルを読み込みます。  
	
    <link rel="stylesheet" href="jquery.tabbar.css">
    <script src="jquery-1.8.3.min.js"></script>
    <script src="jquery.tabbar.js"></script>
 
### Step2 ###
HTMLを記述します。  

    <body>
        <div class="htz-tabview">
            ...ここにコンテンツを記述します...
        </div>
        <div class="htz-tabbar" id="tabbar"></div>
    </body>

`<div class="htz-tabbar" id="tabbar"></div>`にタブバーが生成されます。

### Step3 ###
Javascriptを記述します。  
サンプルのコードは下記の通り。

    <script>
    $(function ()
    {
        $('#tabbar').Tabbar().setListener(function (event, index)
        {
            var hoge = $('#hoge');

            switch (index)
            {
                // ここに画面切替コードなどを記述します
                case 0: hoge.append('tab1<br>'); break;
                case 1: hoge.append('tab2<br>'); break;
                case 2: hoge.append('tab3<br>'); break;
                case 3: hoge.append('tab4<br>'); break;
                case 4: hoge.append('tab5<br>'); break;
            }
        })
        .setUI(['tab1', 'tab2', 'tab3', 'tab4', 'tab5'],
            ['img.png', 'img.png', 'img.png', 'img.png', 'img.png'], 0);
    });
    </script>

switch文の中で画面切替コードを記述します。  
例えば、jQuery Mobileを利用した場合、

    case 0: $.mobile.changePage('#first'); break;
    case 1: $.mobile.changePage('#second'); break;
    ...

のように書くことができます。

関数
---
###Tabbar()###
タブバーオブジェクトを生成します。

    var tabbar = $('#tabbar').Tabbar();

タブバーオブジェクトは4つの関数を持っています。

####setUI(labels, imgs, firstTab)####
タブバーを描画します。第1引数はタブのラベルを配列で、第2引数はタブのアイコン画像を配列で指定します。第3引数は初期状態でアクティブにするタブのインデックスを指定します。第3引数は省略可能です（省略したときは0）。

    tabbar.setUI(
        ['tab1', 'tab2', tab3'], 
        ['icon1.png', 'icon2.png', 'icon3.png'], 
        0
    );

####setListener(callback)####
タブをタップ（クリック）したときに呼ばれる関数を指定します。第2引数にはタップしたタブのインデックスが入ってきます。

    tabbar.setListener(function (event, index)
    {
    });

####tab(index)####
指定したインデックスのタブをアクティブにします。  
タブをタップ（クリック）したときは自動で呼ばれます。

    tabbar.tab(0);

####fire(index)####
イベントを発火します。  
タブをタップ（クリック）したときは自動で呼ばれます。

    tabbar.fire(0);

各関数はタブバーオブジェクト自身を返すので、メソッドチェーン方式で記述することもできます。

    $('#tabbar').Tabbar()
    .setListener(function (event, index) {...})
    .setUI([...], [...]);

ライセンス
----
MIT License