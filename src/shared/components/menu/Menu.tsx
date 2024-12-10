import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";
import { cn } from "../../styles/utils";
import { Paper } from "../common/Paper";
import { DesignContext } from "../core/DesignContext";
import { Backdrop } from "../popovers/Backdrop";

export interface MenuProps extends Ariakit.MenuProviderProps {
  trigger: React.ReactElement | ((open: boolean) => React.ReactElement);
  content: React.ReactNode;
  className?: string;
  backdrop?: boolean;
  portal?: boolean;
  sameWidth?: boolean;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(
  {
    trigger,
    content,
    className,
    portal,
    sameWidth,
    backdrop = false,
    ...props
  },
  ref
) {
  const localStore = Ariakit.useMenuStore({ ...props });
  const store = (props.store ?? localStore) as Ariakit.MenuStore;

  const open = store.useState((s) => s.open);
  const triggertRender =
    typeof trigger === "function" ? trigger(open) : trigger;

  return (
    <Ariakit.MenuProvider store={props.store ?? store}>
      <Ariakit.MenuButton render={triggertRender} />
      <Ariakit.Menu
        gutter={8}
        ref={ref}
        render={<Paper level="popover" />}
        className={cn("p-2 outline-none", className)}
        portal={portal}
        unmountOnHide
        sameWidth={sameWidth}
        backdrop={backdrop ? <Backdrop /> : undefined}
      >
        <DesignContext.Provider rounded="all">{content}</DesignContext.Provider>
      </Ariakit.Menu>
    </Ariakit.MenuProvider>
  );
});
