// var express = require('express');
var User = require("./../models/UserSchema")

var passport = require('passport');
var BearerStrategy = require("passport-http-bearer")
var jwt = require('jsonwebtoken');
passport.use(new BearerStrategy(
    function(token, done) {
        jwt.verify(token,'secret',function(err,decoded){
            console.log(decoded)
        
      User.findOne({_id:decoded.data._id }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, true);
      });
    })}
  ));
