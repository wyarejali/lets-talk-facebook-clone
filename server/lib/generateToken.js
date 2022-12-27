import jwt from 'jsonwebtoken'

export const generateToken = ({ username, userId }) => {
  const token = jwt.sign({ username, userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
  return token
}
