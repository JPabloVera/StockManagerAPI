import MongoDataSource from '../DataAccess/DataSources/mongoDataSource'
import {authorizationError} from '../Services/authService'
import product from '../Interfaces/Product'

/* 
Product resolver definition
*/
export default  {
        /**
         * if there is a valid token returns a product of the db
         */
        product: async (parent:void ,args : void,{userIsVerified,dataSources},info: void)  : Promise<Array<product>>=> {
            //basic auth on the resolver
            if(userIsVerified){
                return await dataSources.db.getProducts()
            }else{
                throw new authorizationError()
            }
        },
         /**
         * if there is a valid token returns a product of the db by the name
         */
        productByName: async (parent: void,{productName} : product,{userIsVerified,dataSources},info: void) => {
            //basic auth on the resolver
            if(userIsVerified){
               return await dataSources.db.productByName(productName)
            }else{
                throw new authorizationError()
            }
        },
         /**
         * if there is a valid token add a product to the db
         */
        addProduct: async (parent: void,{productName, cost, price, idealStock, minimunStock}: product,{userIsVerified,dataSources},info: void) =>{
            if(userIsVerified){
                return await dataSources.db.addProduct({productName, cost, price, idealStock, minimunStock})
            }else{
                throw new authorizationError()
            }
        }
}

