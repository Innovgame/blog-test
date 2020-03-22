const jwt = require('jsonwebtoken');
const ExampleModel = require('../models').examples;
const {
  encrypt,
  comparePassword
} = require('../lib/bcrypt');
const {
  TOKEN_NAME,
  TOKEN_EXPIRESIN
} = require('../config/index');


module.exports = {
  async login(ctx) {
    try {
      const {
        username,
        password
      } = ctx.request.body
      const user = await ExampleModel.findOne({
        where: {
          username
        }
      })
      if (!user) {
        ctx.body = {
          code: 403,
          message: '用户名不存在'
        }
      } else {
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          ctx.body = {
            code: 403,
            message: '密码不正确'
          }
        } else {
          const token = jwt.sign({
            username
          }, TOKEN_NAME, {
            expiresIn: TOKEN_EXPIRESIN
          }); // 生成 token
          ctx.body = {
            code: 200,
            message: '登录成功',
            data: {
              username: user.username,
              artcle: user.artcle,
              token,
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
      // ctx.body = {
      //   code: 500,
      //   msg: 'Internal Server Error.'
      // }
    }
  },

  async register(ctx) {
    const {
      username,
      password
    } = ctx.request.body
    const checkUser = await ExampleModel.findOne({
      where: {
        username
      }
    })
    if (checkUser) {
      ctx.body = {
        code: 403,
        msg: 'This username account is already in use.'
      }
    } else {
      try {
        const saltPwd = await encrypt(password);
        const result = await ExampleModel.create({
          username,
          password: saltPwd
        })

        if (result !== null) {
          ctx.body = {
            code: 200,
            message: '注册成功'
          }
        } else {
          ctx.body = {
            code: 403,
            message: '注册失败'
          }
        }
      } catch (error) {
        console.log(error)
        // ctx.throw(500, 'Internal Server Error.')
        throw error;
      }
    }
  },
  async auth(ctx) {
    ctx.body = 'you get auth';
  }
}
