import discord from "./icons/discord.svg";
import facebook from "./icons/facebook.svg";

export default () => {
  const socialButtons = [
    {
      name: "Discord",
      link: "https://chat.banano.cc"
    },
    {
      name: "Facebook",
      link: "https://www.facebook.com/bananocurrency"
    },
    {
      name: "Github",
      link: "https://github.com/bananocoin"
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/bananocurrency"
    },
    {
      name: "Medium",
      link: "https://medium.com/banano"
    },
    {
      name: "Reddit",
      link: "https://www.reddit.com/r/banano"
    },
    {
      name: "Telegram",
      link: "https://t.me/banano_official"
    },
    {
      name: "Twitter",
      link: "https://twitter.com/bananocoin"
    }
  ];
  return (
    <div className="py-3 flex justify-center items-center bg-[#191a20] w-full flex-col sm:flex-row">
      <div className="w-full max-w-3xl gap-2 flex items-center justify-center">
        {socialButtons.map((button) => {
          return (
            <a href={button.link} rel="noopener" target="_blank">
              <img
                src={require(`./icons/${button.name.toLowerCase()}.svg`)}
                className="h-6 w-6 md:h-7 md:w-7 text-red-400 hover:scale-[110%] transition-transform cursor-pointer"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};
