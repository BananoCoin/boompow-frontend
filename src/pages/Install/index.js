const GithubSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Install = () => {
  return (
    <div className="flex w-full h-full md:w-1/2 flex-col py-8 max-w-4xl text-gray-200">
      <div className="font-semibold text-3xl mb-4">Installation</div>
      <div className="text-md mb-2">
        1. Download the latest BoomPOW release from GitHub:
      </div>
      <div>
        <a
          href="https://github.com/BananoCoin/boompow/releases/latest"
          className="ml-4 bg-accent hover:bg-accent-secondary transition-colors w-min whitespace-nowrap text-gray-900 font-bold flex p-2 rounded"
        >
          <span className="mr-2">Download Latest</span>
          <GithubSvg />
        </a>
      </div>
      <div className="text-md mt-4 mb-2">2. Unzip and extract the folder.</div>
      <div className="text-md mb-2">
        3. Run{" "}
        <span className="bg-dark px-1 py-0.5 rounded-sm">boompow-client</span>.
        You will need to log in using your credentials to start providing PoW.
      </div>
      <div className="ml-4 italic text-gray-300/75">
        Tip: Set up run-with-options so you don't have to manually log in every
        time.
      </div>
      <div className="font-semibold text-3xl mb-4 mt-12">Run With Options</div>
      <div className="text-md mb-2">
        <span className="bg-dark px-1 py-0.5 rounded-sm mr-1">
          run-with-options
        </span>
        is a included file that lets you quickly and easily set up a shortcut to
        run BoomPOW.
      </div>
      <span>
        1. Open it with any text editor of your choice, edit the values to your
        liking.
      </span>
      <span>
        2. You are now good to go and may begin providing PoW by opening it!
      </span>
      <div className="font-semibold text-3xl mb-4 mt-12">Flags</div>
      <div className="text-md pb-6">
        Run
        <span className="bg-dark px-1 py-0.5 rounded-sm mx-1">
          boompow-client --help
        </span>
        for an up-to-date list of all the flags.
      </div>
    </div>
  );
};

export default Install;
