import { Router } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { getGoogleAuthURL, getTokens } from "../../utils/google";
import config from "../../config";

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
  
    const token = jwt.sign(googleUser, jwtSecret);
  
    res.cookie(authCookieName, token, {
      maxAge: authCookieExpiry,
      httpOnly: true,
      secure: false,
    });
  
    res.redirect(clientURI);
});

export default router;