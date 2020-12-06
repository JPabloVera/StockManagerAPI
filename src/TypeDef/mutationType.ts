import {gql} from 'apollo-server-express'

export const MutationType = `
     type Mutation {
        addProduct(product: InputProduct): Product
        registerUser(user: RegisterUser): User
    }
`