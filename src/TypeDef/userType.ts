import {gql} from 'apollo-server-express'

/**
 * we define the user type
 */
export const UserType = `
    extend type Query{
        login(user: RegisterUser): User
    }
    type User{
        username: String
        authToken: String
        age: Int
        nationality: String
        gender: String
    }

    input RegisterUser{
        username: String
        password: String
        age: Int
        nationality: String
        gender: String
    }

`