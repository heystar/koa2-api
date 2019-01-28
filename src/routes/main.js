import Router from 'koa-router'
import { CarouselController } from '../controller/Carousel'

const router = new Router({
  prefix: '/api/v1'
})

const carouselController = new CarouselController()

router.get('/Carousel', async function (ctx) {
  await carouselController.list(ctx)
})

export default router
