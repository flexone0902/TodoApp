
const express = require("express");
const route = require("./route");
//const path = require('path')
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));


// 「res,send」→「res.send」に修正。
// // ルートパスの指定もシンプルに「'/'」で OK
// app.get('/', (req, res) => {
//   res.send('Hello World！');
// });

// // console.log 内の変数名を大文字の PORT に合わせて変更
// app.listen(PORT, () => {
//   console.log(`test Example app listening on port ${PORT}`);
// });

app.use("/", route);

//テンプレートエンジンを使用する
app.set('view engine', 'ejs');

//静的ファイルの使用。publicフォルダに配置
app.use(express.static("public"));


app.listen(PORT, ()=>{
console.log('接続しました。');
});


