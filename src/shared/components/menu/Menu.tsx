import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";
import { Backdrop, Paper, VStack } from "../../../../styled-system/jsx";

export interface MenuProps extends Ariakit.MenuProviderProps {
  trigger: React.ReactElement<any> | ((open: boolean) => React.ReactElement<any>);
  content: React.ReactNode;
  className?: string;
  backdrop?: boolean;
  portal?: boolean;
  sameWidth?: boolean;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(
  { trigger, content, className, portal, sameWidth, backdrop = false, ...props },
  ref,
) {
  const localStore = Ariakit.useMenuStore({ ...props });
  const store = (props.store ?? localStore) as Ariakit.MenuStore;

  const open = Ariakit.useStoreState(store, (s) => s.open);
  const triggertRender = typeof trigger === "function" ? trigger(open) : trigger;

  return (
    <Ariakit.MenuProvider store={props.store ?? store}>
      <Ariakit.MenuButton render={triggertRender} />
      <Ariakit.Menu
        gutter={4}
        ref={ref}
        render={<Paper css={{ bg: "neutral.900", outline: "none" }} />}
        className={className}
        portal={portal}
        unmountOnHide
        sameWidth={sameWidth}
        backdrop={backdrop ? <Backdrop /> : undefined}
      >
        <VStack
          css={{
            p: "1",
            minW: "var(--popover-anchor-width)",
            maxW: "var(--popover-available-width)",
            maxH: "var(--popover-available-height)",
            overflowY: "auto",
            alignItems: "stretch",
          }}
        >
          {content}
        </VStack>
      </Ariakit.Menu>
    </Ariakit.MenuProvider>
  );
});
