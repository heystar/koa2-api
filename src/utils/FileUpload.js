import multer from 'koa-multer'
const path = require('path')

export const upload = () => {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('src/public/upload/'))
    },
    // 修改文件名称
    filename: function (req, file, cb) {
      let fileFormat = file.originalname.split('.') // 以点分割成数组，数组的最后一项就是后缀名
      cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
  })

  return multer({ storage })
}
