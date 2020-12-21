import ProductResolver from './productResolver'
import UserResolver from './userResolver'

/* 
we combine all of the reducer in a single object
*/
export const resolvers = {
    Query: {
        productByName: ProductResolver.productByName,
        product: ProductResolver.product,
        login: UserResolver.login,
        
    },
    Mutation:{
        addProduct: ProductResolver.addProduct,
        registerUser: UserResolver.registerUser
    },
}
