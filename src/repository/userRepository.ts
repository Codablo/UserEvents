import { uuid } from 'uuidv4';

import { User, UsersDB } from '../types'



export class UserRepository {

    userDB: UsersDB

    constructor() {
        this.userDB = {}
    }

    findById(userId: string): User {
        return this.userDB[userId]
    }

    findByEmail(email: String): User {
        for (let key in this.userDB) {
            let user = this.userDB[key]
            if(user.email === email) {
                return user
            }
        }
        return null;
    }

    upsertUser(user: User): User {
        if(!user.id) {
            user.id = uuid()
        }

        this.userDB[user.id] = user
        return user
    }
}