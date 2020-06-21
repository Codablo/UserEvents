import { UserEventRequest, UserEvent, UserEventFilter } from "../types"
import { UserEventRepository } from "../repository/UserEventRepository"



export class UserEventService {
    constructor(private userEventRepository :UserEventRepository) {
        
    }

    insertUserEvent(userEvent :UserEvent) :UserEvent{
        userEvent.created = Date.now()  
        return this.userEventRepository.insertUserEvent(userEvent)
    }

    getEvents(filter :UserEventFilter) :UserEvent[] {
        //TODO: authorization
        return this.userEventRepository.getEvents(filter)
    }
}