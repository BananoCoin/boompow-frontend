import "./Socialicon.css";

export const SocialIcon = (icon) => {
  return (
    <a
      class="m-2 icon-button p-1"
      rel="noopener"
      target="_blank"
      href={icon.href}
    >
      <img
        class="w-12 h-12"
        src={require(`../../public/icon-${icon.name.toLowerCase()}.svg`)}
        alt="{icon.name} Icon"
      />
    </a>
  );
};
