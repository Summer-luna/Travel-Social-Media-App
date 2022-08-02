import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

library.add(faUser, faLock, faGoogle, faFacebook, faGithub, faEnvelope);

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
