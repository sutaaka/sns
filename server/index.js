const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')

const app = new Koa()
const router = new Router()

const Sequelize = require('sequelize')
const sequelize = new Sequelize('sns', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})

const Channels = sequelize.define('channels', {
  name: Sequelize.STRING
})

const Messages = sequelize.define('messages', {
  text: Sequelize.STRING
})

Messages.belongsTo(Channels)

sequelize.sync().then(() => {
  Channels.find({
    where: {
      name: 'general'
    }
  }).then((result) => {
    if (result === null) {
      Channels.create({
        name: 'general',
      })
    }
  })
})

router
  .get('/channels', async (ctx, next) => {
    const results = await Channels.findAll()

    const data = results.map(result => {
      return { id: result.id, name: result.name }
    })

    ctx.body = data

    return next()
  })
  .get('/messages', async (ctx, next) => {
    const channelId = parseInt(ctx.request.query.channelId)

    const results = await Messages.findAll({
      where: { channelId }
    })

    const data = results.map(result => {
      return {id: result.id, channelId: result.channelId, text: result.text}
    })

    ctx.body = data

    return next()
  })
  // .delete('/channels', (ctx, next) => {
  //   const { name } = ctx.request.body
  //
  //   Channels.create({
  //     name: name,
  //   })
  //
  //   return next()
  // })
  .post('/channels', async (ctx, next) => {
    const { name } = ctx.request.body
    console.log(name)

    const rusult = await Channels.create({
      name: name,
    })

    ctx.body = rusult.dataValues
    ctx.status = 201
    // ctx.body = (await Channels.findAll()).map(result => {
    //   return { id: result.id, name: result.name }
    // })

    return next()
  })
  .post('/messages', async (ctx, next) => {
    const { channelId, text } = ctx.request.body
    console.log(channelId, text)

    const result = await Messages.create({
      channelId: channelId,
      text: text
    })

    ctx.body =  { id: result.id, text, channelId }

    ctx.status = 201
  })

app
  .use((ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    // ctx.set('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS');
    return next()
  })
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3001, () => console.log('listen'))
