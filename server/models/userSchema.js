import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    profile_pic: {
      type: String,
      default: 'default_profile_pic.png',
    },
    cover_pic: {
      type: String,
      default: 'default_cover_pic.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: [Object],
      default: {},
    },
    followers: {
      type: [Object],
      default: {},
    },
  },
  { timestamps: true }
)

const UsersSchema = mongoose.model('Users', userSchema)
export default UsersSchema
