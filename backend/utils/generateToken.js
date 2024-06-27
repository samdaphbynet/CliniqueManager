import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (user, res) => {
    const {id, role} = user
    const token = jwt.sign({id: id}, process.env.JWT_SECRET_KEY, {expiresIn: "15d"});
    const tokenName = role === "Admin" ? "AdminToken" : "PatientToken";
    // set cookie
    res.cookie(tokenName, token, {
        httpOnly: true,
        maxAge: 15 * 60 * 60 * 24 * 1000,
        secure: process.env.NODE_ENV !== "production"
    })
    return token;
}