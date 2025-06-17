import { css, cx } from "../../../../styled-system/css";
import { HStack, styled } from "../../../../styled-system/jsx";
import { SystemStyleObject } from "../../../../styled-system/types";
import { isNotNil } from "../../utils/nil";
import { IconBox } from "../common/IconBox";

interface PageTitleProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  onTitleClick?: () => void;
  details?: React.ReactNode;
  className?: string;
  startActions?: React.ReactNode;
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
  endActions,
  css: cssProp,
}: PageTitleProps) {
  return (
    <HStack gap="2" className={cx(css(cssProp), className)}>
      {startActions && <HStack gap="2">{startActions}</HStack>}
      <HStack gap="2" pl="1">
        {icon && <IconBox size={7} icon={icon} css={{ p: "0x" }} weight="bold" />}
        <styled.h1 textStyle="7" fontWeight="semibold" onClick={onTitleClick}>
          {title}
          {isNotNil(details) && (
            <>
              {" "}
              <styled.span fontWeight="normal" color="white/60">
                {details}
              </styled.span>
            </>
          )}
        </styled.h1>
      </HStack>
      {endActions && (
        <HStack gap="2" ml="auto">
          {endActions}
        </HStack>
      )}
    </HStack>
  );
}
