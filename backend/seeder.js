import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js';

dotenv.config()

connectDB()

const importData = async () => {
    try {
        // First, delete all collections
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        // Second, create users array and pass in users from ./data/users.js
        const createdUsers = await User.insertMany(users)

        // Third, establish adminUser from 0 index of users array from ./data/users.js
        const adminUser = createdUsers[0]._id

        // Fourth, for imported products, make 'user' adminUser (as one who made the products)
        const sampleProducts = products.map(product => {
            return {
                ...product, 
                user: adminUser
            }
        })

        // Then insert those updated products into db
        await Product.insertMany(sampleProducts)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.red.underline)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}