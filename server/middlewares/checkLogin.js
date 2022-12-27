import jwt from 'jsonwebtoken'
const checkLogin = (req, res, next) => {
  const { authorization } = req.headers
  try {
    const token = authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (!err) {
        const { userName, userID } = decoded
        req.userName = userName
        req.userID = userID
        next()
      } else {
        res.status(404).json({ message: err.message })
      }
    })
  } catch {
    res.status(403).json({ message: 'You are not authorized' })
  }
}

export default checkLogin
