/*
 * 中台管理token认证
 * @Author: tang.zw 
 * @Date: 2018-11-13 15:48:46 
 * @Last Modified by: tang.zw
 * @Last Modified time: 2018-11-13 17:26:38
 */
export const config = {
  SECRET: 'belle.brand.cms', // jwt secret
  EXP: 24 * 60 * 60 // jwt 过期时间
}