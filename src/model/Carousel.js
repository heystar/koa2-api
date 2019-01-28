/*
 * 首页轮播图
 * @Author: tang.zw
 * @Date: 2018-11-13 10:27:35 
 * @Last Modified by: tang.zw
 * @Last Modified time: 2018-11-13 10:32:02
 */
const mongoose = require('mongoose')

const CarouselSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    text: { type: String, required: false },
    imgSrc: { type: String, required: true },
    url: { type: String, required: true }
  },
  {
    collection: 't_carousel'
  }
)

export const CarouselModel = mongoose.model('carousel', CarouselSchema, 't_carousel')