var request;
var objJSON;
var id_mongo;
const xhr = new XMLHttpRequest();


function _list_k() {
    fetch("http://pascal.fis.agh.edu.pl/~9rewis/zad02/kategoria/list")
       .then(response => {
          response.text().then(data => {
             objJSON = JSON.parse(data);
             var txt = "";
             for (var id in objJSON) {
                txt += id + ": ";
                for (var prop in objJSON[id]) {
                   if (prop !== '_id') { txt +=objJSON[id][prop]; }
                }
                txt += "<br/>";
             }
             document.getElementById('data').innerHTML = '';
             document.getElementById('result').innerHTML = txt;
          });
       })
       .catch(error => console.log("Błąd: ", error));
 }

function _list_z()
{
   fetch("http://pascal.fis.agh.edu.pl/~9rewis/zad02/kategoria/list")
      .then(response => {
         response.text().then(data => {
            objJSON = JSON.parse(data);
            var txt = "<form name='data'><select name='del' size='10'>";
            for (var id in objJSON) {
               txt += "<option value=" + id + " >";
               for (var prop in objJSON[id]) {
                  if (prop !== '_id') { txt +=objJSON[id][prop]}
               }
               txt += "</option>";
            }
            txt += "</select><br/><input type='button' value='wybierz' onclick='_list_z2()(this.form)'/></form>";
            document.getElementById('data').innerHTML = txt;
            document.getElementById('result').innerHTML = '';
         });
      })
      .catch(error => console.log("Błąd: ", error));
}

function _list_z2(form) {
	var kat=objJSON[form.data.value]['kat'];
   fetch("http://pascal.fis.agh.edu.pl/~9rewis/zad02/biblioteka/list")
      .then(response => {
         response.text().then(data => {
            objJSON = JSON.parse(data);
            var txt = "";
            for (var id in objJSON) {
               txt +="| ";
               if(objJSON[id]['Kategoria']==kat)
               {
               for (var prop in objJSON[id]) {
                  if (prop !== '_id') { txt += prop + ": " + objJSON[id][prop] + " | "; }
               }
               txt += "<br/>";
               }
            }
            document.getElementById('data').innerHTML = '';
            document.getElementById('result').innerHTML = txt;
         });
      })
      .catch(error => console.log("Błąd: ", error));
}


function _ins_form_k() {
   var form1 = "<form name='add'><table>" ;
   form1    += "<tr><td>Kategoria</td><td><input type='text' name='kat' value='kategoria' ></input></td></tr>";
   form1    += "<tr><td></td><td><input type='button' value='dodaj kategorie' onclick='_insert_k(this.form)' ></input></td></tr>";
   form1    += "</table></form>";
   document.getElementById('data').innerHTML = form1;
   document.getElementById('result').innerHTML = ''; 
}

function _insert_k(form) {
    var kategoria = {};
    kategoria.kat = form.kat.value;
    txt = JSON.stringify(kategoria);
 
    fetch("http://pascal.fis.agh.edu.pl/~9rewis/zad02/kategoria/save", { method: 'POST', body: txt })
       .then(response => {
          response.text().then(data => {
             document.getElementById('data').innerHTML = '';
             document.getElementById('result').innerHTML = data;
          });
       })
       .catch(error => console.log("Błąd: ", error));
}

function _ins_form_z() {
    var form1 = "<form name='add'><table><td>Kategoria:</td><td>";
    fetch("http://pascal.fis.agh.edu.pl/~9rewis/zad02/kategoria/list", { method: 'GET' })
       .then(response => {
          response.text().then(data => {
             objJSON = JSON.parse(data)
             form1+="<select id='select' name='kat' size='10'>";
             for (var id in objJSON) {
                form1 += "<option value=" + id + " >";
                for (var prop in objJSON[id]) {
                   if (prop !== '_id') { form1 +=objJSON[id][prop]; }
                }
                form1 += "</option>";
             }
            form1 += "</select></td><br/>";
        form1 += "<tr><td>ID:</td><td><input type='text' name='ident' value='0' ></input></td><td></td></tr>";
        form1 += "<tr><td>Tytul:</td><td><input type='text' name='tytul' value='tytul' ></input></td></tr>";
        form1 += "<tr><td>Autorzy:</td><td><input type='text' name='Autorzy' value='Autorzy' ></input></td></tr>";
        form1 += "<tr><td>Wydawnictwo:</td><td><input type='text' name='Wydawnictwo' value='Wydawnictwo' ></input></td></tr>";
        form1 += "<tr><td></td><td><input type='button' value='dodaj ksiazke' onclick='_insert_z(this.form)' ></input></td></tr>";
        form1 += "</table></form>";
        document.getElementById('data').innerHTML = form1;
        document.getElementById('result').innerHTML = '';
          });
       })
       .catch(error => console.log("Błąd: ", error));
 }



function _insert_z(form)  {
    var ksiazka = {};
    ksiazka.Ident = form.ident.value;
    ksiazka.Tytul = form.tytul.value;
    ksiazka.Autorzy = form.Autorzy.value;
    ksiazka.Wydawnictwo = form.Wydawnictwo.value;
    txt = JSON.stringify(ksiazka);
    fetch("http://pascal.fis.agh.edu.pl/~9rewis/zad02/biblioteka/save", { method: 'POST', body: txt })
      .then(response => {
         response.text().then(data => {
            document.getElementById('data').innerHTML = '';
            document.getElementById('result').innerHTML = data;
         });
      })
      .catch(error => console.log("Błąd: ", error));
}
function _del_list_k()
{
    
}

// Usuwanie rekordow z bazy danych
function _del_list_z() { 
    fetch("http://pascal.fis.agh.edu.pl/~9rewis/zad02/rest/list", { method: 'GET' })
    .then(response => {
       response.text().then(data => {
          objJSON = JSON.parse(data)
          var txt = "<form name='data'><select name='del' size='10'>";
          for (var id in objJSON) {
             txt += "<option value=" + id + " >" + id + ": {";
             for (var prop in objJSON[id]) {
                if (prop !== '_id') { txt += prop + ":" + objJSON[id][prop] + ","; }
                else { txt += "id:" + objJSON[id][prop]['$oid'] + ","; }
             }
             txt += "}</option>";
          }
          txt += "</select><br/><input type='button' value='usun' onclick='_delete(this.form)'/></form>";
          document.getElementById('data').innerHTML = txt;
          document.getElementById('result').innerHTML = '';
       });
    })
    .catch(error => console.log("Błąd: ", error));
} 

function _delete(form) {
    var rec = form.del.selectedIndex;
    var id = document.getElementsByTagName('option')[rec].value;
    var id_mongo = objJSON[id]['_id']['$oid'];
    fetch("http://pascal.fis.agh.edu.pl/~9rewis/zad02/rest/delete1/" + id_mongo, { method: 'DELETE' })
       .then(response => {
          response.text().then(data => {
             document.getElementById('data').innerHTML = '';
             document.getElementById('result').innerHTML = JSON.stringify(data);
          });
       })
       .catch(error => console.log("Błąd: ", error));
}

function _upd_list_z() {
    fetch("http://pascal.fis.agh.edu.pl/~9rewis/zad02/rest/list", { method: 'GET' })
       .then(response => {
          response.text().then(data => {
             objJSON = JSON.parse(data)
             var txt = "<form name='data'><select name='del' size='10'>";
             for (var id in objJSON) {
                txt += "<option value=" + id + " >" + id + ": {";
                for (var prop in objJSON[id]) {
                   if (prop !== '_id') { txt += prop + ":" + objJSON[id][prop] + ","; }
                   else { txt += "id:" + objJSON[id][prop]['$oid'] + ","; }
                }
                txt += "}</option>";
             }
             txt += "</select><br/><input type='button' value='popraw' onclick='_upd_form(this.form)'/></form>";
             document.getElementById('data').innerHTML = txt;
             document.getElementById('result').innerHTML = '';
          });
       })
       .catch(error => console.log("Błąd: ", error));
 }
 

function _upd_form(form) {
    var rec = form.del.selectedIndex;
    id_rec = document.getElementsByTagName('option')[rec].value;
    id_mongo = objJSON[id_rec]['_id']['$oid'];
    console.log(id_mongo); 
    var form1 = "<form name='add'><table>" ;
    form1    += "<tr><td>Tytul</td><td><input type='text' name='Tytul' value='"+objJSON[id_rec]['Tytul']+"' ></input></td></tr>";
    form1    += "<tr><td>Autorzy</td><td><input type='text' name='Autorzy' value='"+objJSON[id_rec]['Autorzy']+"' ></input></td></tr>";  
    form1    += "<tr><td>Wydawnictwo</td><td><input type='text' name='Wydawnictwo' value='"+objJSON[id_rec]['Wydawnictwo']+"' ></input></td></tr>";
    form1    += "<tr><td></td><td><input type='button' value='wyslij' onclick='_update(this.form)' ></input></td></tr>";
    form1    += "</table></form>";
    document.getElementById('data').innerHTML = form1;
    document.getElementById('result').innerHTML = ''; 
}

function _update(form) {
    var user = {};
    user.Tytul = form.Tytul.value;
    user.Autorzy = form.Autorzy.value;
    user.Wydawnictwo = form.Wydawnictwo.value;
    fetch("http://pascal.fis.agh.edu.pl/~9rewis/zad02/rest/update1/"+ id_mongo, { method: 'PUT', body: JSON.stringify(user)})
    .then(response => {
       response.text().then(data => {
          document.getElementById('data').innerHTML = '';
          document.getElementById('result').innerHTML = data;
       });
    })
    .catch(error => console.log("Błąd: ", error));
}
