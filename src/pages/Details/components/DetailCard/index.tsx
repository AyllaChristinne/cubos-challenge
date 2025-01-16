import { ReactNode } from "react";
import "./index.scss";

interface IDetailCardProps {
  title: string;
  content: string | ReactNode | Array<ReactNode>;
  isTitleBig?: boolean;
  isContentBold?: boolean;
  className?: string;
}

export function DetailCard({
  content,
  title,
  isContentBold = false,
  isTitleBig = false,
  className,
}: IDetailCardProps) {
  return (
    <div className={`detailCard_container ${className}`}>
      <p className={`detailCard_title${isTitleBig ? "__big" : ""}`}>{title}</p>
      <p className={`detailCard_content${isContentBold ? "__bold" : ""}`}>
        {content}
      </p>
    </div>
  );
}
