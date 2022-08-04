import Image from "next/image";

const LeftPanel = ({ setMode, mode }) => {
  let leftPanelStyle =
    mode === "signup" && "lg:-translate-x-full -translate-y-full";

  return (
    <div className={`${leftPanelStyle} side-panel`}>
      <div
        className={`mb-20 flex flex-col items-center justify-center ${leftPanelStyle} sidePanel-transition`}
      >
        <div className="text-2xl font-bold">New here?</div>
        <p className="p-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button
          className="btn-transparent"
          onClick={() => {
            setMode("signup");
          }}
        >
          Sign up
        </button>
      </div>
      <div className={`${leftPanelStyle} sidePanel-image-transition`}>
        <Image
          src="/images/undraw_file_manager.svg"
          width={600}
          height={500}
          alt="undraw_file_manager"
        />
      </div>
    </div>
  );
};

export default LeftPanel;
