import * as _ from "lodash"
import { uuid } from 'uuidv4';

import { UserEvent, UserEventFilter } from '../types'

export class UserEventRepository {

    userEventDB: UserEvent[]

    constructor() {
        this.userEventDB = []
    }

    insertUserEvent(userEvent :UserEvent) :UserEvent {
        userEvent.id = uuid()

        this.userEventDB.concat(userEvent)
        return userEvent
    }

    getEvents(userEventFilter :UserEventFilter) :UserEvent[] {
        var qualifyingEvents = this.userEventDB

        if(userEventFilter.userId) {
            qualifyingEvents = _.filter(this.userEventDB, userEvent => userEvent.userId === userEventFilter.userId)
        }

        if(userEventFilter.sinceDate) {
            qualifyingEvents = _.filter(this.userEventDB, userEvent => userEvent.created >= userEventFilter.sinceDate)
        }

        return qualifyingEvents
    }
    
}