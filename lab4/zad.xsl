<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0" indent="yes" doctype-system="about:legacy-compact" />
<xsl:template match="/">
<html>
  <head>
    <meta charset="UTF-8"/>
    <title>Zadanie 4 Techniki Internetowe PR</title>
    <link rel="stylesheet" href="styl.css"/>
  </head>
  <body>
    <header>
      <h1>Laboratorium 4 - ćwiczenia</h1>
    </header>
    <main>
      <spis>
        <h3>Spis treści:</h3>
        <ul>
          <xsl:for-each select="//lab/title" >
          <li><xsl:value-of select="."/></li>
          </xsl:for-each>
        </ul>
      </spis>
      <xsl:apply-templates select="labs" />
    </main>
  </body>
</html>
</xsl:template>
<xsl:template match="labs" >
  <xsl:for-each select="//lab" >
      <h2><xsl:value-of select="title" /></h2>
      <p><xsl:value-of select="description" /></p>
  </xsl:for-each>
</xsl:template>
</xsl:stylesheet>