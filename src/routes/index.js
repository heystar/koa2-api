const compose = require ('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

const routes = () => {
    let routers = []
    glob.sync(resolve(__dirname, './', '*.js'))
        .filter(value => (value.indexOf('index.js') === -1))
        .map(router => {
          import(router).then((module) => {
            const route = module.default
            routers.push(route.routes())
            routers.push(route.allowedMethods())
          })
        })
    return compose(routers)
}

export default routes