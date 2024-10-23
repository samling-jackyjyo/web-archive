import { Hono } from 'hono'
import type { Bindings, HonoTypeUserInformation } from './constants/binding'
import tokenMiddleware from './middleware/token'
import showcase from '~/api/showcase'
import pages from '~/api/pages'
import auth from '~/api/auth'
import folders from '~/api/folders'

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
  return c.html(
`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script type="module" src="/static/index.js"></script>
  <link rel="stylesheet" href="/static/index.css">
  <link rel="icon" href="/static/logo.svg" />
  <title>Web Archive</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  )
})

const api = new Hono<HonoTypeUserInformation>()
api.route('/pages', pages.use(tokenMiddleware))
api.route('/auth', auth.use(tokenMiddleware))
api.route('/folders', folders.use(tokenMiddleware))
api.route('/showcase', showcase)
app.route('/api', api)

export default app