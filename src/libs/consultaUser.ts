import { connectDB } from '@/libs/mongodb'
import User from '@/models/user'

export const getMember = async (email: string) => {

    try {
      await connectDB()
      const userFound = await User.findOne({ email: email })
      return userFound
      
    } catch (error) {
      console.log(error)
    }
  }