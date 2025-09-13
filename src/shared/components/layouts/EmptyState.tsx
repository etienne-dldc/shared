import { styled, VStack } from "../../../../styled-system/jsx";
import { IconBox } from "../common/IconBox";

interface EmptyStateProps {
  icon: React.ReactElement<any>;
  text: string;
  action?: React.ReactElement<any>;
}

export function EmptyState({ icon, text, action }: EmptyStateProps) {
  return (
    <VStack css={{ alignItems: "center", justifyContent: "center", p: "6", gap: "2", color: "zinc.600" }}>
      <IconBox icon={icon} size={25} weight="light" />
      <VStack css={{ gap: "4", alignItems: "center" }}>
        <styled.p css={{ textStyle: "7" }}>{text}</styled.p>
        {action}
      </VStack>
    </VStack>
  );
}
