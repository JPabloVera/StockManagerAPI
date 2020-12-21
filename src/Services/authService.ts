import * as jwt from 'jsonwebtoken'
import {createError} from 'apollo-errors'

/**
 * token generation
 * @param user the username of which the token is generated
 */
export const generateToken = async (user) => {
    return await jwt.sign({...user._doc},process.env.TOKEN_SECRET,{expiresIn: "3h"})
}

/**
 * check if the token is valid
 * @param token a given token
 */
export const verifyToken = async (token: string) => {
    return jwt.verify(token,process.env.TOKEN_SECRET,(err,payload)=>{
        //logging should be here
        return err? null : payload
    })

}
/**
 * check if the token is valid
 * @param token a given token
 */
export const checkAuth = async (token: string) =>{
    try{
        //super extremly basic auth
        const authtoken = await verifyToken(token.replace('Bearer ',''))
        if(authtoken !== null){
            return true
        }else{
            return false
        }
    }catch{
        //logging should be here
        return false
    }
}

/**
 * authentication error
 */
export const authorizationError = createError('AuthorizationError',{
    message: 'You are not authorized'
})