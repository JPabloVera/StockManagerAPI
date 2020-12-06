import MongoDataSource from '../DataAccess/DataSources/mongoDataSource'
import {authorizationError} from '../Services/authService'

export default  {
    //query
        product: async (parent,args,{userIsVerified,dataSources},info) => {
            //basic auth on the resolver
            if(userIsVerified){
                return await dataSources.db.getProducts(args)
            }else{
                throw new authorizationError()
            }
        },
        productByName: async (parent,{product},{userIsVerified,dataSources},info) => {
            //basic auth on the resolver
            if(userIsVerified){
               return await dataSources.db.productByName(product)
            }else{
                throw new authorizationError()
            }
        },
        addProduct: async (parent,args,{userIsVerified,dataSources},info) =>{
            if(userIsVerified){
                return await dataSources.db.addProduct(args)
            }else{
                throw new authorizationError()
            }
        }
}

