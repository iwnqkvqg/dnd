import linkedin from "@/assets/images/linkedin.svg";
import github from "@/assets/images/github.svg";


export enum Media {
  GitHub = "GitHub",
  LinkedIn = "LinkedIn",
}

interface SocialMediaIconProps {
  media: Media,
  href: string,
}

const mediaToIcon: Record<Media, string> = {
  [Media.GitHub]: github,
  [Media.LinkedIn]: linkedin,
};

const SocialMediaIcon = (props: SocialMediaIconProps) => {
  return <a
      href={props.href}
      rel="noreferrer noopener"
      target="_blank"
      title={props.media}
    >
      <img src={mediaToIcon[props.media]} alt="" width={24} height={24} />
    </a>;
}

export default SocialMediaIcon;