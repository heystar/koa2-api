import { CarouselModel } from '../model/Carousel'
// /**
//  * 增
//  */
// export const create = async (ctx) => {
//   try {
//     await Carousel._save({ input: ctx.request.body })
//     ctx.pipeDone()
//   } catch (e) {
//     ctx.pipeFail(e)
//   }
// }

// /**
//  * 删
//  */
// export const deleteById = async (ctx) => {
//   ctx.checkParams({
//     _id: {
//       notEmpty: {
//         options: [true],
//         errorMessage: '_id 不能为空',
//       },
//       isMongoId: { errorMessage: '_id 格式不正确' },
//     },
//   })

//   if (ctx.validationErrors()) return null

//   try {
//     await Carousel.remove({ _id: ctx.params._id })
//     ctx.pipeDone()
//   } catch (e) {
//     ctx.pipeFail(e)
//   }
// }

export class CarouselController {
  /**
   * 上传文件
   */
  upload (ctx) {
    if (ctx.req.file)
      ctx.pipeDone({ filename: ctx.req.file.filename })
    else 
      ctx.pipeFail({message: '请上传文件'})
  }

  /**
   * 查
   */
  async list (ctx) {
    try {
      const call = await CarouselModel.find({}, (err, doc) => {
        if (!err) {
          return doc
        }
      })
      ctx.pipeDone(call)
    } catch (e) {
      ctx.pipeFail(e)
    }
  }
}
