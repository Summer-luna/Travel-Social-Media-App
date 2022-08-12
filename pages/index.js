import bgBlob from "../public/images/bg_blob.svg";
import alumRafiki from "../public/images/album-rafiki.svg";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mt-16 flex justify-between font-poppins">
      <div className="basis-2/5">
        <h1 className="py-10 px-3 text-5xl font-bold capitalize">
          Want to plan and share your good journey?
        </h1>
        <p className="px-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link href="/posts">
          <button className="btn-large btn-primary mt-10">
            Let&apos;s start
          </button>
        </Link>
      </div>
      <div className="grid basis-3/5">
        <div className="z-10 col-start-1 col-end-2 row-start-1 row-end-2">
          <Image src={bgBlob} layout="responsive" alt="bg-blob" />
        </div>
        <div className="z-30 col-start-1 col-end-2 row-start-1 row-end-2">
          <Image src={alumRafiki} layout="responsive" alt="alumRafiki" />
        </div>
      </div>
    </div>
  );
}
