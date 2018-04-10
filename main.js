var db = openDatabase('mydb', '1.0', 'My first database', 2 * 1024 * 1024);


function checkDB(){
    if (!db) {
      console.log('Error, la base de datos WebSQL no fue creada');
    }else{
      console.log(db.version);
    }
}
//checkDB();

function insertarDato(){
  var codigo = document.getElementById('codigo').value;
  var producto = document.getElementById('producto').value;
  var precio = document.getElementById('precio').value;
  db.transaction(function (request) {
    request.executeSql('CREATE TABLE IF NOT EXISTS Productos (codigo unique, producto, precio)');
    request.executeSql('INSERT INTO Productos (codigo, producto, precio) VALUES (?,?,?)',[codigo,producto,precio]);
  });

}
