import {generateToken, authorizationError} from '../Services/authService'
import {loginUser} from '../Interfaces/User'

/**
 * user resolver definition
 */
export default {
    /**
     * check if a user is valid in the db, if is valid allows it to log in
     * @param user -> the user data,composed of username and password
     * @returns if successfull json web token otherwise authorizationerror
     */
    login: async (parent,{username,password} : loginUser,{dataSources},info) : Promise<string> => {
        const _user = await dataSources.db.login({username,password})
        if( _user !== null){
            const token = await generateToken(_user)
            _user.authToken = token
            return _user
        }else{
            throw new authorizationError()
        }
    },
    /**
     * 
     * @param args -> username and password
     * 
     * check if a user with the same username exist on db, if not it creates it with the given password
     */
    registerUser: async (parent,args,{dataSources},info) => {
        if(await dataSources.db.userExists(args.user.username)){
            throw new Error(
                "invalid username"
            )
        }else{
            return await dataSources.db.register(args.user)
        }
    }
}