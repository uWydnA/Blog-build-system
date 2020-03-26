var express = require('express');
var router = express.Router();
var sql = require("./../sql/index")
var Role = require('../sql/col/roles')
var uuid = require('node-uuid')
let mydata = [
  {
    "roleName": "超级管理员",
    "roleRight": [
      {
        "category": "文章管理",
        "list": [
          "文章列表",
          "创建文章",
          "文章预览",
          "文章分类"
        ]
      },
      {
        "category": "用户管理",
        "list": [
          "用户列表",
          "添加用户",
          "删除用户",
          "修改用户"
        ]
      },
      {
        "category": "权限管理",
        "list": [
          "角色列表",
          "权限列表",
          "添加角色",
          "修改角色",
          "删除角色"
        ]
      }
    ],
    "default": true
  },
  {
    "roleName": "管理员",
    "roleRight": [
      {
        "category": "文章管理",
        "list": [
          "文章列表",
          "创建文章",
          "文章预览",
          "文章分类"
        ]
      }
    ],
    "default": true
  },
  {
    "roleName": "小编",
    "roleRight": [
      {
        "category": "文章管理",
        "list": [
          "文章列表",
          "创建文章",
          "文章预览"
        ]
      }
    ],
    "default": true
  }
]
    
/**
 * @api {post} /api/users/login 登录接口
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
  *  @apiSampleRequest /api/users/login
  *  @apiVersion 1.0.0
 */
sql.find({
  colName: Role,
  where: {
    roleName:'超级管理员'
  }
}).then(data => {
  if (data.length === 0 || data === undefined) {
    sql.insert({
      colName: Role,
      data: mydata
    })
  }
})
router.get('/', function (req, res, next) {
  sql.find({
    colName: Role
  }).then(data => {
    res.send(data)
  })
});


module.exports = router;
