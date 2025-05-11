


document.getElementById('todo-form').addEventListener('submit', function(e) {
  const progress = document.getElementById('progress').value;
  if (!/^\d+$/.test(progress) || progress < 0 || progress > 100) {
    alert("進捗度は0から100までの半角数字で入力してください。");
    e.preventDefault();
  }
});
