import jwt from 'jsonwebtoken'

const generateToken = async (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" })

    res.cookie("Access_Token", token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

export default generateToken