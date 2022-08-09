/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FIREBASE_API_KEY: "AIzaSyCk3z9Ktvrz242ttjqyOmO3rbaySYqFWpk",
    FIREBASE_AUTH_DOMAIN: "travel-social-media-app-d4b62.firebaseapp.com",
    FIREBASE_PROJECT_ID: "travel-social-media-app-d4b62",
    FIREBASE_STORE_BUCKET: "travel-social-media-app-d4b62.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "30079951808",
    FIREBASE_APP_ID: "1:30079951808:web:de9e732e049800bc63de25",
  },
};

module.exports = nextConfig;
