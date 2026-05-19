import jwt from 'jsonwebtoken'

const generateTokens = (userId, res) => {
    const payload = { id: userId }
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' })

    res.cookie("jwt", token, {//poteer
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60,//to be changed later
    })
    return token
}
export default generateTokens