import {gql} from 'apollo-server-express'

/**
 * product type definition
 */
export const ProductType = `
    type Query {
        product: [Product],
        productByName(product: String): Product
    }
    type Product {
        id: ID
        productName: String
        cost: Int
        profit: Int
        idealStock: Int
        minimunStock: Int
    }
    input InputProduct {
        productName: String
        cost: Int
        profit: Int
        idealStock: Int
        minimunStock: Int
    }
`
