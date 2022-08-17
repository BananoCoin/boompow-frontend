import { Link, useNavigate, useSearchParams } from "react-router-dom";

import logo from "images/logo.svg";
import { useUserStore } from "stores";

const Header = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  const { user } = useUserStore();

  return (
    <div
      className="shrink-0 flex px-4 justify-center items-center w-full h-20 bg-dark z-10"
      style={{
        boxShadow: "rgb(0 0 0 / 15%) 0px 10px 12px",
      }}
    >
      <div className="h-full w-full max-w-7xl flex items-center justify-between">
        <Link to="/" title="Go Home">
          <img
            src={logo}
            alt="Home"
            width="64px"
            onClick={() => window.scrollTo(0, 0)}
          />
        </Link>
        <div className="flex text-sm font-medium text-banano-yellow hover:text-accent-secondary gap-2">
          <button
            className={`border border-banano-yellow hover:border-accent-secondary rounded-md py-2 px-4 transition-colors`}
            onClick={(e) => {
              if (!user) {
                setSearchParams("?modal=login");
              } else {
                navigate("/dashboard");
              }
            }}
          >
            {!user ? "Log In" : "Dashboard"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
