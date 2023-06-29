import { Router } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { getGoogleAuthURL, getTokens } from "../../utils/google";
import { IUserDocument, IUsers } from "../../types/models";
import config from "../../config";
import UserRepo from "../../db/repository/Users";
import { MongooseError } from "mongoose";

const { 
    clientURI, 
    serverURI,
    jwtSecret,
    authCookieName,
    authCookieExpiry,
    googleClientID, 
    googleClientSecret,
} = config;
const router:Router = Router();
const redirectURI = "auth/google";

router.get("/auth/google/url", (req, res) => {
    return res.send(getGoogleAuthURL());
});

router.get(`/${redirectURI}`, async (req, res) => {
    const code = req.query.code as string;
  
    const { id_token, access_token } = await getTokens({
      code,
      clientId: googleClientID,
      clientSecret: googleClientSecret,
      redirectUri: `${serverURI}/${redirectURI}`,
    });
  
    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user`);
        throw new Error(error.message);
      });
  
    const user: IUserDocument | MongooseError | null | undefined = await UserRepo.findByUserEmail(googleUser.email);
    let token = "";

    if(!user) {
        const newUser: IUserDocument | MongooseError | undefined = await UserRepo.createNewUser({
            name: googleUser.name,
            email: googleUser.email,
            isAdmin: false,
            isGoogleUser: true,
        } as IUsers);

        if(!newUser) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }

        if(newUser instanceof MongooseError) {
            if(newUser.name === "ValidationError") {
                return res.status(400).json({
                    message: "Invalid data",
                });
            }

            return res.status(500).json({
                message: "Internal server error",
            });
        }

        token = jwt.sign({ id: newUser._id }, jwtSecret, {
            expiresIn: '1d',
        });
    } else {
        if(user instanceof MongooseError) {
            if(user.name === "ValidationError") {
                return res.status(400).json({
                    message: "Invalid data",
                });
            }

            return res.status(500).json({
                message: "Internal server error",
            });
        }

        token = jwt.sign({ id: user._id }, jwtSecret, {
            expiresIn: '1d',
        });
    }

    res.cookie(authCookieName, token, {
        maxAge: authCookieExpiry,
        httpOnly: true,
        secure: true,
    });

    res.redirect(clientURI);
});

export default router;