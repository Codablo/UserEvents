import { UserRepository } from "../repository/userRepository";
import { User } from "../types"

export class UserService {
    constructor(private userRepository :UserRepository) {
    }

    getUser(userId :string) :User {
        return this.userRepository.findById(userId)
    }

    upsertUser(user :User) :User {
        this.validateRequiredFields(user)
        this.validateIsUniqueEmail(user)
        this.validatePhoneNumberFormat(user.phone)
            
        return this.userRepository.upsertUser(user)
    }

    private validateIsUniqueEmail(user :User) :void {
        let existingUser = this.userRepository.findByEmail(user.email)
        if(existingUser && existingUser.id !== user.id) {
            throw new Error("Email already in use.")
        }
    }

    private validatePhoneNumberFormat(phoneNumber :string) :void {
        if(phoneNumber) {
            let validPhoneRegex = /^\d{3}-\d{3}-\d{4}$/
            if(!validPhoneRegex.test(phoneNumber) ) {
                throw new Error("Phone number must be of format: '###-###-####'.")
            }
        }
    }

    private validateRequiredFields(user :User) {
        if(!user || !user.email || !user.password) {
            throw new Error("'email' and 'password' are required fields.")
        }
    }
}
