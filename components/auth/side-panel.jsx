import Image from "next/image";

const SidePanel = ({ setMode, mode }) => {
  let leftPanelStyle;
  let rightPanelStyle;

  if (mode === "signup") {
    rightPanelStyle = "lg:translate-x-0 translate-y-0";
    leftPanelStyle = "lg:-translate-x-full -translate-y-full";
  }

  if (mode === "signin") {
    rightPanelStyle =
      "lg:translate-x-full pointer-events-none translate-y-full";
  }

  return (
    <>
      <div
        className={`sidePanel-transition z-50 p-16 text-center ease-in-out ${leftPanelStyle} flex items-center lg:flex-col`}
      >
        <div
          className={`mb-20 flex flex-col items-center justify-center ${leftPanelStyle} sidePanel-transition`}
        >
          <div className="text-2xl font-bold">New here?</div>
          <p className="p-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button
            className="transparent mt-3 h-11 w-32 rounded-3xl border-2 text-sm font-semibold"
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
      <div
        className={`sidePanel-transition z-50 p-16 text-center ease-in-out ${rightPanelStyle} flex items-center lg:flex-col`}
      >
        <div
          className={`mb-32 flex flex-col items-center justify-center ${rightPanelStyle} sidePanel-transition`}
        >
          <div className="text-2xl font-bold">One of us?</div>
          <p className="p-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button
            className="transparent h-11 w-32 rounded-3xl border-2 text-sm font-semibold"
            onClick={() => {
              setMode("signin");
            }}
          >
            Sign in
          </button>
        </div>
        <div className={`${rightPanelStyle} sidePanel-image-transition `}>
          <Image
            src="/images/undraw_new_message.svg"
            width={500}
            height={400}
            alt="undraw_to_the_moon"
          />
        </div>
      </div>
    </>
  );
};

export default SidePanel;
