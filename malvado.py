#!/usr/bin/env python
# coding: utf-8

#===============================================================================
# Ejemplo de un script CGI maligno en Python utilizado para realizar ataques de
# inyección HTML, Cross-site scripting (XSS) y Cross-site request forgery (CSRF)
# Este script se debe correr del lado de un servidor web con Apache.
#===============================================================================

from os import environ
from sys import stderr

print >> stderr, environ['QUERY_STRING']

print 'Content-type: text/html; charset=utf-8'
print
print '''<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8"/>
    <style>
        body {
          background: Black;
          color: Silver;
          font-family: sans-serif;
          font-size: 120%;
          margin: 40px;
        }
        h1 {
          color: LimeGreen;
        }
    </style>
    <title>¡Has sido hackeado!</title>
  </head>
  <body>
    <h1>¡Felicidades! Has sido hackeado.</h1>
    <p>Muy triste tu caso :-(</p>'''
if environ['QUERY_STRING']:
    print '<p>Query string recibido: %s</p>' % (environ['QUERY_STRING'],)
print '''  </body>
</html>'''