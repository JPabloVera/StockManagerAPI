import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'

const salt_round = parseInt(process.env.SALT_WORK_FACTOR)

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    age: Number,
    nationality: String,
    gender: String
})


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