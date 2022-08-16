import { Link, useSearchParams } from "react-router-dom";

import logo from "images/logo.svg";

const Header = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className="sticky flex px-4 justify-center items-center w-full h-20 bg-dark"
      style={{
        boxShadow: "rgb(0 0 0 / 25%) 0px 10px 12px",
      }}
    >
      <div className="h-full w-full max-w-7xl flex items-center justify-between">
        <Link to="/" title="Go Home">
          <img src={logo} alt="Home" width="64px" />
        </Link>
        <div className="flex text-sm font-medium text-accent hover:text-accent-secondary gap-2">
          <button
            className={`border border-accent hover:border-accent-secondary rounded-md py-2 px-4 transition-colors`}
            onClick={(e) => {
              setSearchParams("?modal=auth&tab=login");
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
