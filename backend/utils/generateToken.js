import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (user, res) => {
  try {
    const { id, role } = user;
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });
    const tokenName = role === "Admin" ? "AdminToken" : "PatientToken";
    // set cookie
    res.cookie(tokenName, token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: true,
    });
    return token;
  } catch (error) {
    console.log("Error in generateTokenAndSetCookie: ", error);
    throw new Error("Failed to generate token");
  }
};
