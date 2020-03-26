var express = require('express');
var router = express.Router();
var sql = require("./../sql/index")
var User = require('../sql/col/users')
var uuid = require('node-uuid')
/**
 * @api {get} /api/users 登录接口
 * @apiDescription 登录接口
 * @apiGroup users
 * @apiParam {string} tel 手机号码
 * @apiParam {string} password 手机号码
 * @apiSuccessExample {json} Success-response:
 *  res.send({
        code:'10808',
        message:'用户还未注册'
    })
    res.send({
        code:'10000',
        message:'密码错误'
    })
     res.send({
      code:'10888',
      message:"登录成功"
    })
  *  @apiSampleRequest /api/users
  *  @apiVersion 1.0.0
 */

// 启动项目初始化创建一位默认超级管理员
sql.find({
  colName: User,
  where: {
    username: 'admin'
  }}).then(data => {
    if (data.length === 0 ){
      sql.insert({
        colName: User,
        data: [
          {
            "username": "admin",
            "password": 123456,
            "roleName": "超级管理员",
            "roleState": true,
            "default": true,
            "roleType": 3
          },
          {
            "username": "root",
            "password": 123456,
            "roleName": "管理员",
            "roleState": true,
            "default": false,
            "roleType": 2,
          },
          {
            "username": "react",
            "password": 123456,
            "roleName": "小编",
            "roleState": true,
            "default": false,
            "roleType": 1,
          }
      ]})
    }
  })
// router.get('/', function(req, res, next) {
//   res.send({name:'users'})
// });
// 登录接口
router.post('/login', function(req, res, next) {
  
  const { username, password } = req.body
  //判断用户名是否存在
  sql.find({
    colName: User,
    where:{
      username
    }
  }).then(data => {
    //不存在
    if (data.length === 0) {
      res.send({
        code: 10805,
        message: '用户名未创建'
      })
    } else {
      //存在，判断密码是否正确
      sql.find({
        colName: User,
        where:{
          username,
          password
        }
      }).then(data => {
        //不正确
        if (data.length === 0) {
          res.send({
            code: 10806,
            message: '用户密码不正确'
          })
        } else {
          //正确，判断登录权限是否开启
          if ( data[0].roleState ) {
            data[0].password = null
            res.send({
              code: 16888,
              message: '登录成功',
              data: data[0]
            })
          } else {
            res.send({
              code: 10808,
              message: '登录未授权'
            })
          }
        }
      })
    }
  })
});

// 注册接口
router.post('/register', function(req, res, next) {

const { username, password, roleName, roleState, default:Boolean, roleType } = req.body
// 查询是否有该账户名
sql.find({
  colName: User,
  where:{
    username
  }
}).then(data => {
    // 没有，注册
    if (data.length === 0) {
      sql.insert({
        colName: User,
        data: {
          username,
          password,
          roleName,
          roleState,
          default:Boolean,
          roleType
        }
      }).then( () =>{
          res.send({
            code: 16888, 
            message:'用户创建成功',
            data: {
              username,
              password,
              roleName,
              roleState,
              default:Boolean,
              roleType
            }
          })
      })
      // 有，用户名已注册
    } else {
        res.send({
          code: 10606,
          message: '用户名重复'
        })
    }
  })
});

// 删除用户接口,对象data:{_id:id} =》req.body
router.delete('/', function (req, res, next) {
  sql.delete({
    colName: User,
    where: req.body
  }).then(() => {
    res.send({
      code: 10086,
      message: 'delete ok'
    });
  })
});

// 更新用户信息接口
router.put('/update', function (req, res, next) {
  sql.update({
    colName: User,
    where: {
      _id: req.body._id
    },
    newdata: req.body
  }).then(() => {
    res.send({
      code: 10087,
      message: 'user update ok'
    })
  })
});

// 更新用户roleState状态接口

router.put('/roleState', function (req, res, next) {
  sql.update({
    colName: User,
    where: {
      _id: req.body._id
    },
    newdata: req.body
  }).then(() => {
    res.send({
      code: 10088,
      message: 'roleState update ok'
    })
  })
});



router.get('/', function (req, res, next) {
  sql.find({
    colName: User
  }).then(data => {
    // console.log(111)
    res.send(data)
  })
});
module.exports = router;
