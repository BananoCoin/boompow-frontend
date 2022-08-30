import { SocialIcon } from "./SocialIcon";

export const Footer = () => {
  const icons = [
    { name: "Discord", href: "https://chat.banano.cc" },
    { name: "Reddit", href: "https://www.reddit.com/r/banano" },
    { name: "Twitter", href: "https://twitter.com/bananocoin" },
    { name: "Medium", href: "https://medium.com/banano" },
    { name: "Telegram", href: "https://t.me/banano_official" },
    { name: "Facebook", href: "https://www.facebook.com/bananocurrency" },
    { name: "Instagram", href: "https://www.instagram.com/bananocurrency" },
    { name: "GitHub", href: "https://github.com/bananocoin" }
  ];

  const socialIcons = icons.map((icon) => {
    return SocialIcon(icon);
  });

  const now = new Date().getFullYear();

  return (
    <div className="w-full pt-4 pb-12 relative z-0 bg-dark text-white">
      <div className="y-container flex flex-col justify-between items-center px-2 md:px-4">
        <div className="flex flex-row flex-wrap justify-center items-center">
          {socialIcons}
        </div>
        <div className="flex flex-row mt-6">
          <span>©{now},&nbsp;</span>
          <a
            href="https://banano.cc"
            rel="noopener"
            target="_blank"
            className="font-bold hover:underline focus:underline text-white"
          >
            Banano
          </a>
        </div>
      </div>
    </div>
  );
};
