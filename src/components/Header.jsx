import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { apolloClient } from "apollo";
import logo from "images/logo.svg";
import { useCookies } from "react-cookie";

const Header = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["token"]);

  return (
    <div
      className="shrink-0 flex px-4 py-3 justify-center items-center w-full bg-dark z-10"
      style={{
        boxShadow: "rgb(0 0 0 / 15%) 0px 10px 12px"
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
        <div className="flex text-sm font-medium text-banano-yellow gap-2">
          <button
            className={`border border-banano-yellow hover:border-accent-secondary hover:text-accent-secondary rounded-md py-2 px-4 transition-colors`}
            onClick={(e) => {
              if (!cookies.token) {
                setSearchParams("?modal=login");
              } else {
                navigate("/dashboard");
              }
            }}
          >
            {!cookies.token ? "Log In" : "Dashboard"}
          </button>
          <button
            className={`border border-banano-yellow hover:border-accent-secondary hover:text-accent-secondary rounded-md py-2 px-4 transition-colors ${
              !cookies.token && "hidden"
            }`}
            onClick={(e) => {
              setCookie("token", "");
              navigate("/");
              apolloClient().resetStore();
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
