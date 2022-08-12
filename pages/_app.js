import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faLock,
  faEnvelope,
  faPlus,
  faCloudArrowUp,
  faImage,
  faFileLines,
  faCheck,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { AuthUserProvider } from "../context/userContext";

library.add(
  faUser,
  faLock,
  faGoogle,
  faFacebook,
  faGithub,
  faEnvelope,
  faPlus,
  faCloudArrowUp,
  faImage,
  faFileLines,
  faCheck,
  faMagnifyingGlass
);

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthUserProvider>
  );
}

export default MyApp;
