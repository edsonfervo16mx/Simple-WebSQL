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
  location.reload(true);
}

function listarDato(){
  db.transaction(function (request) {
    request.executeSql('SELECT * FROM Productos',[],
      function (request, results){
        for (var i = 0; i < results.rows.length; i++) {
          //console.log(results.rows.item(i).codigo);
          document.getElementById('data-list').innerHTML += '<tr><td>'+results.rows.item(i).codigo+'</td><td>'+results.rows.item(i).producto+'</td><td>'+results.rows.item(i).precio+'</td><td><button onclick="verDato(\''+results.rows.item(i).codigo+'\');">Mostrar</button><button onclick="eliminarDato(\''+results.rows.item(i).codigo+'\')">Eliminar</button></td></tr>'
        }
      },
    );
  });
}

function verDato(codigo){
  db.transaction(function (request) {
    request.executeSql('SELECT * FROM Productos WHERE codigo = ?',[codigo],
      function (request, results){
        for (var i = 0; i < results.rows.length; i++) {
          document.getElementById('div-editar').innerHTML = '<br><h3>Modificar</h3><label for="codigo">codigo</label><input type="text" id="ncodigo" value="'+results.rows.item(0).codigo+'"><input type="text" id="codigo_anterior" value="'+results.rows.item(0).codigo+'" hidden><br><label for="producto">producto</label><input type="text" id="nproducto" value="'+results.rows.item(0).producto+'"><br><label for="precio">precio</label><input type="text" id="nprecio" value="'+results.rows.item(0).precio+'"><br><br><button type="button" name="button" onclick="modificarDato();">Modificar</button><br>';
        }
      },
    );
  });

}

function modificarDato(){
  var codigo = document.getElementById('ncodigo').value;
  var codigo_anterior = document.getElementById('codigo_anterior').value;
  var producto = document.getElementById('nproducto').value;
  var precio = document.getElementById('nprecio').value;
  db.transaction(function (request) {
    request.executeSql('UPDATE Productos SET codigo = ? , producto = ? ,precio = ? WHERE codigo = ?',[codigo,producto,precio,codigo_anterior]);
  });
  location.reload(true);
}

function eliminarDato(codigo){
  db.transaction(function (request) {
    request.executeSql('DELETE FROM Productos WHERE codigo = ?',[codigo]);
  });
  location.reload(true);
}

listarDato();
