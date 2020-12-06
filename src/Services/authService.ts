import * as jwt from 'jsonwebtoken'
import {createError} from 'apollo-errors'

export const generateToken = async (user) => {
    return await jwt.sign({...user._doc},process.env.TOKEN_SECRET,{expiresIn: "3h"})
}

export const verifyToken = async (token) => {
    return jwt.verify(token,process.env.TOKEN_SECRET,(err,payload)=>{
        //logging should be here
        return err? null : payload
    })

}

export const checkAuth = async (token) =>{
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

export const authorizationError = createError('AuthorizationError',{
    message: 'You are not authorized'
})