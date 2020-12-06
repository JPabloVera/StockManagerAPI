import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import { ApolloServer} from 'apollo-server'
import MongoDataSource from './src/DataAccess/DataSources/mongoDataSource'
import {resolvers} from './src/Resolvers/resolvers'
import {typedef} from './src/TypeDef/typeDef'
import {checkAuth} from './src/Services/authService'


(async ()=>{
    dotenv.config()

    mongoose.connect(process.env.MONGO_DEV,{ useNewUrlParser: true,useUnifiedTopology: true })
    
    const server = new ApolloServer({typeDefs: typedef,resolvers: resolvers,dataSources: () => ({
            db: new MongoDataSource()
        }),
        context: async ({req}) => {
            //extremly basic logic to check the token
            const token = req.headers.authorization || ''

            const userIsVerified = await checkAuth(token)
            //we should return the scope of token here but for now we are returning a boolean
            return {userIsVerified}

        }
    })

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`)
    });
    
})()
