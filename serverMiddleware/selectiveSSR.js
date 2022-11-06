const admin = '\/admin'
const pattern = new  RegExp(`${admin}.*`)

export default function(req, res, next) {
    if (pattern.test(req.originalUrl)) {
        res.spa = true
    }
    next()
}
