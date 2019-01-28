/*
 * 中台用户管理
 * @Author: tang.zw
 * @Date: 2018-11-21 15:02:16
 * @Last Modified by: tang.zw
 * @Last Modified time: 2018-11-27 10:30:58
 */
const mongoose = require('mongoose')

const AdminUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    currentAuthority: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      match: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    },
    avatar: { type: String, trim: true }
  },
  {
    collection: 't_admin_user'
  }
)

export const AdminUserModel = mongoose.model('AdminUser', AdminUserSchema)
