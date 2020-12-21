import {DataSource} from 'apollo-datasource'
import {Product} from '../Models/product'
import {User} from '../Models/user'
import userModel from '../../Interfaces/User'
import {loginUser,user} from '../../Interfaces/User'
import ProductModel from '../../Interfaces/Product'

class MongoDataSource extends DataSource{
    constructor(){
        super()
    }

    initialize(config){}
    /** 
     * @returns all of the documents under Product collection
     */
    async getProducts() : Promise<Array<ProductModel>> {
        return await Product.find()
    }
    /**
     * 
     * @param product name of a product
     * 
     * @returns a particular product given a product name
     */
    async productByName(product: String) : Promise<ProductModel>{
        const products= Product.findOne({"productName":product})
        return await products
    }
    /**
     * 
     * @param data product object
     * 
     * @returns adds a product to the db
     */
    async addProduct(product: ProductModel) : Promise<ProductModel>{
        const addedProduct = new Product(product)
        await addedProduct.save()
        return await this.productByName(product.productName)
    }

    /**
     * 
     * @param username a username
     * 
     * @returns a given user
     */
    async getUser(username: String) : Promise<user>{
        const user = await User.findOne({'username':username}).select('-password')
        return user
    }
    /**
     * 
     * @param username 
     * 
     * @returns Boolean -> check if user exist
     */
    async userExists(username: string) : Promise<boolean>{
        return await User.exists({'username':username})
    }

    /**
     * add a new user to the db
     * 
     * @param data user object
     * 
     * @return the newly created user
     */
    async register(user : userModel) : Promise<user>{
        const newUser = new User(user)
        await newUser.save()
        const selectNewUser = await this.getUser(user.username)
        return selectNewUser
    }
    /**
     * check if the user exist in the db, if it exist it return the username without the password
     * @param data user object
     */
    async login(data : loginUser) : Promise<user>{
        return await User.findOne({'username':data.username},function(err,user){
            if(err) return null
            //check if the password is correct
            user.comparePassword(data.password, (err) =>{
                return err? null : user
            })
        }).select('-password') //we dont return the password
    }

}

export default MongoDataSource