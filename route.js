const express = require("express");
const router = express.Router();  
const db = require("./sqlite");


//ルートを集約化

router.get('/', (req, res) => {
  db.serialize(() => {
    db.all('SELECT * FROM todos WHERE priority = 1', (err, rows) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return;
      }
      
      // ここで取得したデータをビューに渡します。
      res.render('index', { todos: rows });  // ここでtodosをビューに渡す
    });
  });
});



router.get('/list', (req, res) => {
  db.serialize(() => {
    db.all('SELECT * FROM todos', (err, rows) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return;
      }
      
      // ここで取得したデータをビューに渡します。
      res.render('list', { todos: rows });  // ここでtodosをビューに渡す
    });
  });
});





router.get('/delete/:id', (req, res) => {
  const id = req.params.id;  // id を取得

  db.serialize(() => {
    db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return;
      }
      // ここで取得したデータをビューに渡します。
      res.render('delete');
    });
  });

});
  


router.get('/add/:id', (req, res) => {
  const id = req.params.id;
  db.serialize(() => {
    // 対象のtodoを取得
    db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Error fetching todo:', err);
        return;
      }
      if (!row) {
        return res.status(404).send('Todo not found'); // データが見つからない場合
      }

      // 編集フォームにデータを渡す　todoという値で、addページで使用する事が出来る
      res.render('add', { todo: row });
    });
  });
});


router.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const { title, name, contents, progress, priority, due_date, progress_site, now_comment } = req.body;

  db.serialize(() => {
    // UPDATE文でデータを更新
    db.run('UPDATE todos SET title = ?, name = ?, contents = ?, progress = ?, priority = ?, due_date = ?, progress_site = ?, now_comment = ? WHERE id = ?', 
    [title, name, contents, progress, priority, due_date, progress_site, now_comment, id], 
    function(err) {
      if (err) {
        console.error('Error updating todo:', err);
        return;
      }

      // 更新後に編集画面またはリストページにリダイレクト
      res.redirect('/');
    });
  });
});




router.get('/new', (req, res)=>{
      res.render('new');
});

router.post('/new', (req, res)=>{

  const { title, name, contents, progress, priority, due_date, progress_site, now_comment } = req.body;

  const stmt = db.prepare("INSERT INTO todos (title, name, contents, progress, priority, due_date, progress_site, now_comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
stmt.run(title, name, contents, progress, priority, due_date, progress_site, now_comment, function(err) {
  if (err) {
    console.error("挿入エラー:", err.message);
  } else {
    console.log("挿入成功。ID:", this.lastID);
    res.render('new-finish');
  }
});
stmt.finalize();

});




// define the about route
router.get('/about', (req, res) => {
  res.send('About date');
});

module.exports = router;


// db.serialize(() => {
//     db.run('CREATE TABLE todo ()');
//       });


