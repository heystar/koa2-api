import Router from 'koa-router'
import { AdminUserController } from '../controller/Admin-User'
import { CarouselController } from '../controller/Carousel'
import { upload } from '../utils/FileUpload'
import jwt from 'koa-jwt'
import { config } from '../config/token'

const router = new Router({
  prefix: '/api/v2'
})

const { SECRET } = config

const adminUserController = new AdminUserController()
// 后台用户登录
router.post('/login', async function (ctx) {
  await adminUserController.login(ctx)
})

router.post('/register', async function (ctx) {
  await adminUserController.register(ctx)
})
// 后台用户列表
router.get('/userlist', jwt({ secret: SECRET }), async function (ctx) {
  await adminUserController.list(ctx)
})

const carouselController = new CarouselController()
// 轮播图上传
router.post('/carousel/upload', jwt({ secret: SECRET }), upload().single('file'), async ctx => {
  await carouselController.upload(ctx)
})

export default router
