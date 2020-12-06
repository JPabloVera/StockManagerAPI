import {ProductType} from './productType'
import {MutationType} from './mutationType'
import {UserType} from './userType'
import {gql} from 'apollo-server-express'


export const typedef = gql(ProductType.concat(" ",MutationType,UserType))