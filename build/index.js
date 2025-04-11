const { run } = require('runjs')
const chalk = require('chalk')
const config = require('../vue.config.js')
const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')

if (process.env.npm_config_preview || rawArgv.includes('--preview')) {
  const report = rawArgv.includes('--report')

  run(`vue-cli-service build ${args}`)

  const port = 9526
  const publicPath = config.publicPath

  var connect = require('connect')
  var serveStatic = require('serve-static')
  const app = connect()

  app.use(
    publicPath,
    serveStatic('./dist', {
      index: ['index.html', '/']
    })
  )

  app.listen(port, function () {
    console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`))
    if (report) {
      console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`))
    }

  })
} else {
  run(`vue-cli-service build ${args}`)
}



            // const formData = new FormData()
            // formData.append('answer', data.answer)
            // console.log('解析后的给罗的数据:', data)
            // try {
            //   // 向第一个API发送数据
            //   const response = fetch('http://api.xdrv.cn:52381/zhihuijiaoyu/get_qa/', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json'
            //     },
            //     body: formData
            //   })
            //   if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`)
            //   }
            //   // 获取第一个API的响应数据
            //   const responseData = response.json()
            //   // 向第二个API转发数据
            //   const forwardResponse = fetch('http://192.168.1.103:8000/shownq/', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(responseData)
            //   })
            //   if (!forwardResponse.ok) {
            //     throw new Error(`HTTP error! status: ${forwardResponse.status}`)
            //   }
            //   const result = forwardResponse.json()
            //   console.log('Forward response:', result)
            // } catch (error) {
            //   console.error('Error in handleData:', error)
            // }
