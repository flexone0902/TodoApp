const sqlite3 = require('sqlite3').verbose();

// 第３引数のコールバック関数で接続結果を受け取る
const db = new sqlite3.Database(
  './sqlite.db',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error('データベース接続エラー:', err.message);
    } else {
      console.log('SQLite DB への接続に成功しました');
    }
  }
);


module.exports = db;

//データベースはsqlite CLIで操作


//作成したテーブル
// CREATE TABLE IF NOT EXISTS todos (
//   id            INTEGER   PRIMARY KEY AUTOINCREMENT,
//   title         TEXT      NOT NULL,
//   name          TEXT      NOT NULL,
//   contents      TEXT,
//   progress      INTEGER   NOT NULL DEFAULT 0,
//   priority      INTEGER   NOT NULL DEFAULT 0,
//   created_at    DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   updated_at    DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   due_date      DATE,
//   staff_name    TEXT,
//   progress_site TEXT,
//   now_comment   TEXT
// );


