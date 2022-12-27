import bcrypt from 'bcrypt'
import { generateToken } from '../lib/generateToken.js'
import UsersSchema from '../models/userSchema.js'
/**
 * Get all users
 *
 */
export const getUsers = async (req, res) => {
  try {
    let users = await UsersSchema.find().sort({ createdAt: 'descending' })
    users = users.map((user) => {
      const { password, ...rest } = user._doc
      return rest
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json(error)
  }
}

/**
 * get a specific user by username
 */

export const getUser = async (req, res) => {
  const username = req.params.username
  try {
    const user = await UsersSchema.findOne({ username })
    if (user) {
      const { password, ...rest } = user._doc
      res.status(200).json(rest)
    }
  } catch (error) {
    res.status(404).json({ message: 'No user found' })
  }
}

/**
 * get a specific user by Id
 */

export const getUserById = async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await UsersSchema.findById(userId)
    if (user) {
      const { password, ...rest } = user._doc
      res.status(200).json(rest)
    }
  } catch (error) {
    res.status(404).json({ message: 'No user found' })
  }
}

/**
 * Create a new user account
 *
 */

export const signup = async (req, res) => {
  const { fullname, email, username, password } = req.body
  try {
    // Find the user already associated with the user email
    const oldUser = await UsersSchema.findOne({ email })
    if (!oldUser) {
      // Find the user already associated with the username
      const user_name = await UsersSchema.findOne({ username })
      if (!user_name) {
        // Hash the user password
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashPassword = await bcrypt.hash(password, salt)

        // Create the user
        const newUser = new UsersSchema({
          fullname,
          email,
          username,
          password: hashPassword,
        })

        // Save the user
        let user = await newUser.save()

        // Create access token for the user
        const token = generateToken({
          username: user.username,
          userId: user._id,
        })

        if (user) {
          const { password, ...rest } = user._doc
          user = rest
        }
        res.status(200).send({
          user,
          access_token: token,
          message: 'User created successfully',
        })
      } else {
        res
          .status(404)
          .json({ message: 'User already exists with the username' })
      }
    } else {
      res.status(404).json({ message: 'User already exists with the email' })
    }
  } catch (error) {
    console.log(error.message)
  }
}

/**
 * Sign in a user
 *
 */
export const login = async (req, res) => {
  const { username, password } = req.body
  try {
    // find the user
    const user = await UsersSchema.findOne({ username })
    if (user) {
      // Chheck the password
      const isValidated = await bcrypt.compare(password, user.password)

      if (isValidated) {
        // Create access token for the user
        const token = generateToken({
          username: user.username,
          userId: user._id,
        })

        const { password, ...rest } = user._doc
        res.status(200).json({
          user: rest,
          access_token: token,
          message: 'login successfully',
        })
      } else {
        res.status(403).send({ message: 'Wrong username or password' })
      }
    } else {
      res.status(403).send({ message: 'Wrong username or password' })
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
/**
 * Update user profile
 */

export const updateUser = async (req, res) => {
  const userId = req.params.userId
  const { _id, password } = req.body

  try {
    if (userId === _id) {
      // if we have to update the password then the passwrod will be bcrypted again
      if (password) {
        // Hash the user password
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        req.body.password = await bcrypt.hash(password, salt)
      }

      // Update the user
      const user = await UsersSchema.findByIdAndUpdate(userId, req.body, {
        new: true,
      })
      if (user) {
        const { password, ...rest } = user._doc
        res.status(200).send({
          user: rest,
          message: 'User updated successfully',
        })
      }
    } else {
      res.status(403).json({
        message: 'Access Denied! You can update only your own account.',
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went worng' })
  }
}
/**
 * Delete user profile
 */

export const deleteUser = async (req, res) => {
  const userId = req.params.userId
  const { id } = req.body
  try {
    const user = await UsersSchema.findById(userId)
    if (user) {
      const author = await UsersSchema.findById(id)
      if (author.isAdmin) {
        // if the admin is authorized then delete the user
        await UsersSchema.findByIdAndDelete(userId)
        res.status(200).json({ message: 'User deleted successfully' })
      } else {
        res.status(401).json({ message: 'you are not admin' })
      }
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
