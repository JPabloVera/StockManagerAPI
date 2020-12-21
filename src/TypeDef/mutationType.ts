import {gql} from 'apollo-server-express'

/**
 * we define the mutation type
 */
export const MutationType = `
     type Mutation {
        addProduct(product: InputProduct): Product
        registerUser(user: RegisterUser): User
    }
`