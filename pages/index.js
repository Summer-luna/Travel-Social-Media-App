import MyPosts from "../components/home/myPosts";
import { useUser } from "../context/userContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomePage() {
  const { currentUser } = useUser();
  const router = new useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth");
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <MyPosts />
    </div>
  );
}
