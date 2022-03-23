#!/usr/bin/python3
import cgi
import cgitb

cgitb.enable()
form = cgi.FieldStorage()
dane = form.getvalue("dane")
with open('./plik.txt', 'a') as baza:
    baza.write(dane)

print("Content-type: text/html")
print()