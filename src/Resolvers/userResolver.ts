import {generateToken, authorizationError} from '../Services/authService'

export default {
    
    login: async (parent,{user},{dataSources},info) => {
        const _user = await dataSources.db.login(user)
        if( _user !== null){
            const token = await generateToken(_user)
            _user.authToken = token
            return _user
        }else{
            throw new authorizationError()
        }
    },
    registerUser: async (parent,args,{dataSources},info) => {
        if(await dataSources.db.userExists(args.user.username)){
            throw new Error(
                "invalid username"
            )
        }else{
            return await dataSources.db.register(args)
        }
    }
}