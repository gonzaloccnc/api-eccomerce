import 'dotenv/config'

export const authUsers = (req, res, next) => {
    if (['DEVELOPMENT', 'PRODUCTION'].includes(process.env.ENVIROMENT) || req.host === 'techsed.netlify.app') {
        return next()
    }
    res.status(404).send('Access not Authorized')
}