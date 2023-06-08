import mongoose from 'mongoose'

const URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : 'mongodb://localhost/databasetest'

const connectDb = async () => {
  await mongoose.connect(URI)
  console.log('DB is connected')
}

export default connectDb
