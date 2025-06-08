import { HStack, styled } from "../../../../styled-system/jsx";
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
}

export function PageTitle({ icon, title, onTitleClick, details, className, startActions, endActions }: PageTitleProps) {
  return (
    <HStack gap="2" className={className}>
      {startActions && <HStack gap="2">{startActions}</HStack>}
      <HStack gap="2" pl="1">
        {icon && <IconBox size={28} icon={icon} css={{ p: "0x" }} weight="bold" />}
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
