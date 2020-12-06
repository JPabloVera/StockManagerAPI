import {DataSource} from 'apollo-datasource'
import {Product} from '../Models/product'
import {User} from '../Models/user'

class MongoDataSource extends DataSource{
    constructor(){
        super()
    }

    initialize(config){}

    async getProducts(){
        return await Product.find()
    }
    async productByName(product: String){
        const products= Product.findOne({"productName":product})
        console.log(products)
        return await products
    }

    async addProduct(data){
        const addedProduct = new Product(data.product)
        await addedProduct.save()
        return await this.productByName(data.product.productName)
    }

    async getUser(username: String){
        const user = await User.findOne({'username':username}).select('-password')
        return user
    }
    async userExists(username: string){
        return await User.exists({'username':username})
    }

    async register(data){
        const newUser = new User(data.user)
        await newUser.save()
        const user = await this.getUser(data.user.username)
        return user
    }
    async login(data){
        return await User.findOne({'username':data.username},function(err,user){
            if(err) return null
            user.comparePassword(data.password, (err) =>{
                return err? null : user
            })
        }).select('-password')
    }

}

export default MongoDataSource