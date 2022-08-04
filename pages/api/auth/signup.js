import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../../utils/firebase.util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body.formFields;
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName: username });
      res.status(200).json("successfully create an account.");
    } catch (err) {
      console.log(err.message);
    }
  }
};

export default handler;
