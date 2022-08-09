import MyPosts from "../components/home/myPosts";
import { useUser } from "../context/userContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const { currentUser } = useUser();
  const router = useRouter();

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
