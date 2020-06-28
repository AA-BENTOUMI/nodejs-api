var express = require("express");
var users = require("./../models/UserSchema")
var userlogin =require("./../models/userloginSchema")
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post("/login",(req,res)=>{
    users.findOne({
        email: req.body.email
      }, function(err, resultat) {
          if(err) res.send(err)
          else{
              var token = jwt.sign({
                  exp: Math.floor(Date.now()/1000)+(60*60),
                  data : resultat
              }, 'secret');
              userlogin.create({token},(err,done)=>{
                  res.send(done)
              })
          }
        //   res.send(user)
        // if (err) throw err;
        // if (!users) {
        //   res.status(401).json({ message: 'Authentication failed. User not found.' });
        // } else if (user) {
        //   if (!user.comparePassword(req.body.password)) {
        //     res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        //   } else {
        //     return res.json({token: jwt.sign({ email: users.email, password: user.password}, 'RESTFULAPIs')});
        //   }
        // }
      });
})

module.exports = router;

// function authenticate({ username, password }) {
//     const user = await users.findOne({ username });
//     if (user && bcrypt.compareSync(password, user.hash)) {
//         const { hash, ...userWithoutHash } = user.toObject();
//         const token = jwt.sign({ sub: user.id }, config.secret);
//         return {
//             ...userWithoutHash,
//             token
//         };
//     }
// }
