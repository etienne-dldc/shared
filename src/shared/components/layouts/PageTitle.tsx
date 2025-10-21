import { HStack, styled } from "../../../../styled-system/jsx";
import { SystemStyleObject } from "../../../../styled-system/types";
import { IconBox } from "../common/IconBox";

interface PageTitleProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  onTitleClick?: () => void;
  details?: React.ReactNode;
  className?: string;
  startActions?: React.ReactNode;
  middleActions?: React.ReactNode;
  endActions?: React.ReactNode;
  css?: SystemStyleObject;
}

export function PageTitle({
  icon,
  title,
  onTitleClick,
  details,
  className,
  startActions,
  middleActions,
  endActions,
  css: cssProps,
}: PageTitleProps) {
  return (
    <HStack css={{ gap: "2", ...cssProps }} className={className}>
      {startActions && <HStack css={{ gap: "2" }}>{startActions}</HStack>}
      <HStack css={{ gap: "2", pl: "1" }}>
        {icon && <IconBox size={7} icon={icon} css={{ p: "0x" }} weight="bold" />}
        <styled.h1 css={{ textStyle: "7", fontWeight: "semibold" }} onClick={onTitleClick}>
          {title}
          {Boolean(details) && (
            <>
              {" "}
              <styled.span css={{ fontWeight: "normal", color: "white/60" }}>{details}</styled.span>
            </>
          )}
        </styled.h1>
      </HStack>
      {middleActions && <HStack css={{ gap: "2", mr: "auto" }}>{middleActions}</HStack>}
      {endActions && <HStack css={{ gap: "2", ml: "auto" }}>{endActions}</HStack>}
    </HStack>
  );
}

PageTitle.displayName = "PageTitle";
