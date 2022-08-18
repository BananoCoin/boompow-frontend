import React from "react";
import { useSearchParams } from "react-router-dom";

export const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = (event) => {
      if (event.target.lastChild?.id !== "modalContainer") return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const Modal = ({ modal, title }) => {
  const ref = React.useRef();
  let [searchParams, setSearchParams] = useSearchParams();

  useOnClickOutside(ref, () => {
    setSearchParams("");
  });

  return (
    <div
      className="z-50 absolute w-screen h-screen top-0 left-0 right-0 bottom-0 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.40)" }}
    >
      <div
        id="modalContainer"
        ref={ref}
        className="bg-dark rounded-lg shadow-lg max-w-[400px] w-11/12"
      >
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between items-center p-2 sm:rounded-t-xl">
            <div className="text-gray-300/25">{title}</div>
            <button onClick={() => setSearchParams("")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#d1d5db40"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        {modal}
      </div>
    </div>
  );
};

export default Modal;
