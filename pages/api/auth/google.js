import { signInWithGoogleProvider } from "../../../utils/firebase.util";

const handler = async (req, res) => {
  const authUser = await signInWithGoogleProvider();
};

export default handler;
