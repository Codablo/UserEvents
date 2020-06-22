import * as Router from 'koa-router'
import { isUuid } from 'uuidv4';

import { User, UserEvent, UserEventFilter } from "../types"
import { UserRepository } from "../repository/userRepository"
import { UserService } from "../service/userService"
import { UserEventRepository } from '../repository/UserEventRepository';
import { UserEventService } from '../service/userEventService';
import { ParameterizedContext } from 'koa';
import { filter } from 'lodash';

const apiRouter = new Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

const userEventRepository = new UserEventRepository()
const userEventService = new UserEventService(userEventRepository)

apiRouter.post("/user", async (ctx, next) => {
    const createUserRequest = <User> ctx.request.body;
    let createdUser :User = null

    try {
        createdUser = userService.upsertUser(createUserRequest)
        ctx.status = 201
        ctx.body = createdUser
        ctx.set('Location', `/user/${createdUser.id}`)
    } catch(error) {
        ctx.body = error.message;
        ctx.status = 400
    }
    
    await next()
})

apiRouter.get("/user/:userid", async (ctx, next) => {
    const user = userService.getUser(ctx.params.userid)
    if(!user) {
        ctx.status = 404
    } else {
        ctx.body = user
    }
    await next()
})



apiRouter.get("/user/event", async (ctx, next) => {

    //Hack since this is picking up :userid   :(
    const filter = getUserEventFilter(ctx)
    filter.userId = null

    ctx.body = userEventService.getEvents(filter)
    await next()
})

apiRouter.get("/user/:userid/event", async (ctx, next) => {
    ctx.body = userEventService.getEvents(getUserEventFilter(ctx))
    await next()
})

apiRouter.post("/user/:userid/event", async (ctx, next) => {
    const userEvent = <UserEvent> ctx.request.body
    userEvent.userId = ctx.params.userid

    try {
        const createdUserEvent = userEventService.insertUserEvent(userEvent);
        ctx.status = 201
        ctx.body = createdUserEvent
        ctx.set('Location', `/user/${createdUserEvent.userId}/event/${createdUserEvent.id}`)
    } catch (error) {
        ctx.status = 400
        ctx.body = error.message   
    }
    
    await next()
})

apiRouter.get("/user/:userid/event/:eventid", async (ctx, next) => {

    const events = userEventService.getEvents(getUserEventFilter(ctx))
    if(events.length < 1) {
        ctx.status = 404
    } else {
        ctx.body = events
    }
    
    await next()
})

function getUserEventFilter(ctx: ParameterizedContext) :UserEventFilter {
    return {
        userId: ctx.params.userid,
        sinceDate: ctx.query.sinceDate,
        userEventId: ctx.params.eventid
    }
}


export default apiRouter;