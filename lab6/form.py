#!/usr/bin/env python3
import sys
sys.stderr = sys.stdout
import cgi

formularz = cgi.FieldStorage()
Imie = formularz.getvalue('pole1')
Nazwisko = formularz.getvalue('pole2')
Mail = formularz.getvalue('email')
RokStudiow = formularz.getvalue('test')
plik = open('../../labs/06/data.csv', 'a')
plik.write(f'{Imie},{Nazwisko},{Mail},{RokStudiow}\n')
plik.close()

print("Content-type: text/html")
print("Refresh: 1; URL=data.py")
print()
