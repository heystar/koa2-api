/*
 * 中台用户管理
 * @Author: tang.zw
 * @Date: 2018-11-21 15:15:12
 * @Last Modified by: tang.zw
 * @Last Modified time: 2018-11-27 10:10:56
 */

import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { AdminUserModel } from '../model/Admin-User'
import { config } from '../config/token'

const SALT = 'cms.admin:'

export class AdminUserController {
  /**
   * 登录
   * @param {*} ctx
   */
  async login (ctx) {
    const data = ctx.request.body
    if (!data || !data.username || !data.password) {
      ctx.pipeFail({ message: '用户名或密码不能为空' })
    } else {
      let { username, password } = data
      password = crypto
        .createHash('md5')
        .update(SALT + password)
        .digest('hex')
      const result = await AdminUserModel.findOne({
        username,
        password
      })
      if (result) {
        let { SECRET, EXP } = config
        jwt.sign(
          {
            name: result.username,
            _id: result._id
          },
          SECRET,
          { expiresIn: EXP }
        )
        ctx.pipeDone(result)
      } else {
        ctx.pipeFail({ message: '用户名或密码错误' })
      }
    }
  }

  /**
   * 注册
   * @param {*} ctx 
   */
  async register (ctx) {
    try {
      const data = ctx.request.body
      if (!data || !data.username || !data.password) {
        return ctx.pipeFail({ message: '用户名或密码不能为空' })
      }
      let { username, password, email } = data
      const checkUser = await AdminUserModel.findOne({
        username
      })
      if (checkUser) {
        ctx.pipeFail({ message: '该用户名已存在' })
      } else {
        password = crypto
          .createHash('md5')
          .update(SALT + password)
          .digest('hex')
        const user = new AdminUserModel({
          username,
          password,
          email
        })

        const result = await user.save()
        ctx.pipeDone(result)
      }
    } catch (e) {
      ctx.pipeFail({ message: '注册用户失败' })
    }
  }

  /**
   * 查询用户
   * @param {*} ctx 
   */
  async list (ctx) {
    try {
      const result = await AdminUserModel.find({})
      ctx.pipeDone(result)
    } catch (e) {
      ctx.pipeFail(e)
    }
  }
}
