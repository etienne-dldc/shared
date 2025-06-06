import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";
import { Paper, styled } from "../../../../styled-system/jsx";
import { Backdrop } from "../popovers/Backdrop";

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
        render={<Paper level="select" outline="none" />}
        className={className}
        portal={portal}
        unmountOnHide
        sameWidth={sameWidth}
        backdrop={backdrop ? <Backdrop /> : undefined}
      >
        <styled.div
          p="1"
          minW="var(--popover-anchor-width)"
          maxW="var(--popover-available-width)"
          maxH="var(--popover-available-height)"
          overflowY="auto"
        >
          {content}
        </styled.div>
      </Ariakit.Menu>
    </Ariakit.MenuProvider>
  );
});
