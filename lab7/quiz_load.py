#!/usr/bin/python3

Zima = 0
Wiosna = 0
Lato = 0
Jesien = 0

with open('./plik.txt', 'r') as plik:
  Rekordy = plik.readlines()
  for rekord in Rekordy:
    Zima += int(rekord[0])  
    Wiosna += int(rekord[2])
    Lato += int(rekord[4])
    Jesien += int(rekord[6])
   
print("Content-type: text/html")
print()
print(str(Zima) + "," + str(Wiosna) + "," + str(Lato) + "," + str(Jesien))