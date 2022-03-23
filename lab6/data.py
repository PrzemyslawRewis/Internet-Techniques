#!/usr/bin/env python3

def robtabele(uczestnicy):
  html = ''
  wynik = ''
  wynik+='<table>\n'
  wynik+='<thead><tr><th>Nazwisko</th><th>Imie</th><th>Email</th><th>Rok</th></tr></thead>\n'
  wynik+='<tbody>\n'
  for i, record in enumerate(uczestnicy):
    dane = record.split(',')
    wynik += f'<tr><th>{dane[1]}</th><th>{dane[0]}</th><th>{dane[2]}</th><th>{dane[3]}</th></tr>'
    wynik += '\n'
  wynik+='</tbody>\n'
  wynik+='</table>\n'
  html += wynik
  return html

rekordy = open('../../labs/06/data.csv')
tabela = robtabele(rekordy)

print("Content-type: text/html") 
print()
print('''

<!doctype html>
<html lang=pl>
<head>
<title>JavaScript walidacja formularza</title>
<meta charset="UTF-8" />
<style>
body
{
	padding-top: 20px; 
	background-color: rgba(163, 173, 228, 0.932);
	text-align: center;
	font-family: Verdana, Geneva, Tahoma, sans-serif ;

}

table { margin-left: auto; margin-right: auto; align-content: center;border-collapse:collapse; width: 60%;margin-top: 30px;}
table, td, th { border:1px solid black; color:black }
thead {background-color: white;}
.t1{text-align: center;font-weight: bold; background-color:plum}
.t3{background-color: white;}

a
{
  padding: 5px 10px;
  font-size: 1.1em;
  background-color: rgb(239, 230, 247);;
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 12px;
  cursor: pointer;
}

</style>

</head>
<body>
<a href="../../labs/06/index.html" >Formularz danych</a>
<a href="data.py">Lista danych </a>
''')




print(tabela)
print('''
</body>
</html>
''')
