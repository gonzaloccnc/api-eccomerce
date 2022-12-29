import jwt from 'jsonwebtoken'

export const validateAccess = (req, res, next) => {
    if (!['PATCH', 'POST', 'DELETE'].includes(req.method))
        return next()

    const authorization = req.get('authorization')
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    let decodeToken = {}

    try {
        decodeToken = jwt.verify(token, process.env.SECRET)
    }
    catch (error) {
    }

    if (!token || decodeToken.role === 'user') {
        return res.status(401).json({ error: "token mising or not authorized, or token expired" })
    }

    next()
}