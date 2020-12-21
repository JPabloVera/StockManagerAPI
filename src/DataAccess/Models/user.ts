import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'

const salt_round = parseInt(process.env.SALT_WORK_FACTOR)
/* 
    Moongose model definition
 */
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    age: Number,
    nationality: String,
    gender: String
})

/* 
    executes function before a object is saved in the db, in this case we hash the passwords of a new user
*/
userSchema.pre('save',function(next){
    try{

        let user = this
        if (!user.isModified('password')) return next();
        
        bcrypt.genSalt(salt_round, function(err, salt) {
            if (err) return next(err);
            
            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                
                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });

    }catch(err){
        //logging should be done here
        console.log(err)
    }
    
})

/* 
    check that the password is valid
*/
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    try{
        
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }catch(err){
        //logging should be done here
        console.log(err)
    }
};
export const User = mongoose.model('User',userSchema,'User')