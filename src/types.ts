
export interface User {
    id: string
    email: string
    password: string
    phone: string
}

export interface UsersDB {
    [id: string] : User
}

export interface UserEvent {
    id: string,
    userId: string,
    type: string,
    created: number
}

export interface UserEventRequest {
    filter: UserEventFilter
}

export interface UserEventFilter {
    userId: string
    sinceDate: number
    userEventId: string
}