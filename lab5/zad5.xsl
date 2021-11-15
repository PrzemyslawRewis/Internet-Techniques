<?xml version="1.0" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="5.0" indent="yes" doctype-system="about:legacy-compact" />
<xsl:param name="sortuj">nazwaproduktu</xsl:param>
<xsl:template match="/">
<html>
  <head>
    <meta charset="UTF-8"/>
    <title>Zadanie 5 Techniki Internetowe PR</title>
    <link rel="stylesheet" href="styl.css"/>
  </head>
  <body>
    <main>
      <nav>
        <h2>Stan magazynu</h2>
        <div>
          <span>Sortuj rosnąco według:</span>
          <a href="?sortuj=nazwaproduktu">Nazwa</a>
          <a href="?sortuj=cena">Cena</a>
          <a href="?sortuj=ilosc">Ilość</a>
        </div>
      </nav>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Ilość</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
        <xsl:for-each select="//grupa" >
          <tr>
            <th colspan="3"><xsl:value-of select="nazwagrupy" /></th>
          </tr>
            
          <xsl:if test="$sortuj = 'nazwaproduktu'">
            <xsl:for-each select="produkty/produkt">
              <xsl:sort select="nazwaproduktu/text()" data-type="text" />
              <xsl:call-template name="produkt" />
            </xsl:for-each>
          </xsl:if>

          <xsl:if test="$sortuj = 'ilosc'">
            <xsl:for-each select="produkty/produkt">
              <xsl:sort select="ilosc/text()" data-type="number" />
              <xsl:call-template name="produkt" />
            </xsl:for-each>
          </xsl:if>

          <xsl:if test="$sortuj = 'cena'">
            <xsl:for-each select="produkty/produkt" >
              <xsl:sort select="cena/text()" data-type="number" />
              <xsl:call-template name="produkt" />
            </xsl:for-each>
          </xsl:if>
         
        </xsl:for-each>
        </tbody>
      </table>
    </main>
  </body>
</html>
</xsl:template>
<xsl:template name="produkt">
  <tr>
   <td><xsl:value-of select="nazwaproduktu" /></td>
   <td><xsl:value-of select="ilosc" /></td>
   <td><xsl:value-of select="cena" /></td>
  </tr>
</xsl:template>
</xsl:stylesheet>