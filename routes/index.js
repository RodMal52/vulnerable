'use strict';

var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname + '/../foro.db');
var router = express.Router();

module.exports = router;

//------------------------------------------------------------------------------
router.get('/', function (req, res) {

  var usuario = req.cookies.usuario
  var passwd = req.cookies.passwd

  if (usuario != undefined && passwd != undefined) {
    autenticar(usuario, passwd, req, res, paginaPrincipal);

  } else {

    usuario = req.query.usuario;
    passwd = req.query.passwd;

    if (usuario != undefined && passwd != undefined) {
      autenticar(usuario, passwd, req, res, paginaPrincipal);
    } else {
      res.render('login');
    }
  }
});

//------------------------------------------------------------------------------
function autenticar(usuario, passwd, req, res, callback) {

  var resultado = false;

  db.get(
    "select usuario from usuarios where " +
    "usuario = '" + usuario + "' and " +
    "passwd = '" + passwd + "'",
    function (err, renglon) {
      callback(err, usuario, passwd, req, res, renglon !== undefined);
    }
  );
}

//------------------------------------------------------------------------------
function guardar(usuario, texto, callback) {
  db.run(
    "insert into entradas values ('" + usuario + "', '" + texto + "')",
    callback
  );
}

//------------------------------------------------------------------------------
function desplegarEntradas(usuario, res) {
  db.all("select texto, usuario from entradas", function (err, renglones) {
    if (err) {
      console.log(err);
    }
    res.render('index', { usuario: usuario, entradas: renglones });
  });
}

//------------------------------------------------------------------------------
function paginaPrincipal(err, usuario, passwd, req, res, autentico) {

  if (err) {
    console.log(err);
  }

  if (autentico) {
    if ('logout' in req.query) {
      res.clearCookie('usuario');
      res.clearCookie('passwd');
      res.render('finalizar');

    } else {
      res.cookie('usuario', usuario);
      res.cookie('passwd', passwd);
      if ('texto' in req.query) {
        guardar(usuario, req.query.texto, function (err) {
          if (err) {
            console.log(err);
          }
          desplegarEntradas(usuario, res);
        });

      } else {
        desplegarEntradas(usuario, res);
      }
    }

  } else {
    res.render('error_autenticacion');
  }
}

//------------------------------------------------------------------------------
