import { UserEventRequest, UserEvent, UserEventFilter } from "../types"
import { UserEventRepository } from "../repository/UserEventRepository"



export class UserEventService {
    constructor(private userEventRepository :UserEventRepository) {
        
    }

    insertUserEvent(userEvent :UserEvent) :UserEvent{
        this.validateUserEvent(userEvent);
        userEvent.created = Date.now()  
        return this.userEventRepository.insertUserEvent(userEvent)
    }

    getEvents(filter :UserEventFilter) :UserEvent[] {
        return this.userEventRepository.getEvents(filter)
    }

    private validateUserEvent(userEvent :UserEvent) {
        if(!userEvent || !userEvent.type ) {
            throw new Error("'type' is a required field.")
        }
    }
}