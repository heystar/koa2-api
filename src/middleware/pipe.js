export const pipe = async (ctx, next) => {
  // 成功返回
  ctx.pipeDone = result => {
    ctx.body = { status: 'ok', code: '1', data: result}
  }
  // 失败返回
  ctx.pipeFail = (e, code = '0') => {
    let { message } = e
    ctx.body = { status: 'error', code, message }
  }
  await next()
}
