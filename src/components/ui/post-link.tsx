import Image from "next/image";
import { FC, useState } from "react";

interface PostLinkProps {
  href: string;
  imageUrl: string;
  linkText: string;
  className?: string;
}

const PostLink: FC<PostLinkProps> = ({
  href,
  imageUrl,
  linkText,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  const handleStopPropagation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    // e.preventDefault();
  };

  return (
    <div className={`flex items-center gap-[8px] ${className}`}>
      {!imageError && imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          width={24}
          height={24}
          className="size-[24px] rounded-[7px] object-cover"
          onError={handleImageError}
        />
      )}
      <a
        href={href}
        onClick={handleStopPropagation}
        className="flex items-center gap-[4px] text-blue300 underline decoration-blue300"
      >
        {linkText}
        <Image src="/static/icons/link.svg" alt="Link" width={16} height={16} />
      </a>
    </div>
  );
};

export default PostLink;
