#!/usr/bin/python3 
import cgi 
from lxml import etree

xmlfile = open('../../labs/05/zad5.xml')     
xslfile = open('../../labs/05/zad5.xsl')
xmldom = etree.parse(xmlfile)
xsldom = etree.parse(xslfile)
transform = etree.XSLT(xsldom) 
form = cgi.FieldStorage()
sortuj = form.getvalue('sortuj', 'nazwaproduktu')
result = transform(xmldom, sortuj=f"'{sortuj}'")
print("Content-type: text/html") 
print()
print(result)

#wersja Pascal
#sciezka skryptu ~/public_html/cgi-bin/TI_2021
