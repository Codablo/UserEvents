import * as Koa from "koa"
import * as logger from "koa-logger"
import * as json from "koa-json"
import * as bodyParser from "koa-bodyparser"
import * as etag from "koa-etag"

import router from "./routes/apiRouter"

const app = new Koa()

//TODO: Add auth middleware
app.use(json())
    .use(logger())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(etag())

    app.listen(8080, () => {
        console.log("User Event web server started.")
    })
    