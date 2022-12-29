import 'dotenv/config'

export const authUsers = (req, res, next) => {
    if (process.env.ENVIROMENT === 'DEVELOPMENT' || req.host === 'techsed.netlify.app') {
        return next()
    }
    res.status(404).send('Access not Authorized')
}