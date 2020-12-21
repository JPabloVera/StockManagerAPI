import {ProductType} from './productType'
import {MutationType} from './mutationType'
import {UserType} from './userType'
import {gql} from 'apollo-server-express'

/**
 * we combine all of the differents types and then we export it
 */
export const typedef = gql(ProductType.concat(" ",MutationType,UserType))