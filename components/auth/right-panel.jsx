import Image from "next/image";

const RightPanel = ({ setMode, mode }) => {
  let rightPanelStyle =
    mode === "signup"
      ? "lg:translate-x-0 translate-y-0"
      : "lg:translate-x-full pointer-events-none translate-y-full";

  return (
    <div className={`side-panel ${rightPanelStyle}`}>
      <div
        className={`mb-32 flex flex-col items-center justify-center ${rightPanelStyle} sidePanel-transition`}
      >
        <div className="text-2xl font-bold">One of us?</div>
        <p className="p-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button
          className="btn-transparent"
          onClick={() => {
            setMode("signin");
          }}
        >
          Sign in
        </button>
      </div>
      <div className={`${rightPanelStyle} sidePanel-image-transition`}>
        <Image
          src="/images/undraw_new_message.svg"
          width={500}
          height={400}
          alt="undraw_to_the_moon"
        />
      </div>
    </div>
  );
};

export default RightPanel;
