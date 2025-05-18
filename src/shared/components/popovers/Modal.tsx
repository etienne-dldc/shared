import * as Ariakit from "@ariakit/react";
import { XIcon } from "@phosphor-icons/react";
import { Fragment, forwardRef, useCallback } from "react";
import { cn, tw } from "../../styles/utils";
import { pick } from "../../utils/pick";
import { Button } from "../button/Button";
import { Paper } from "../common/Paper";
import { DynamicColorProvider } from "../core/DynamicColorProvider";
import { PageTitle } from "../layouts/PageTitle";
import { Backdrop } from "./Backdrop";

interface ModalProps {
  children?: React.ReactElement<any>;
  title: string;
  content: React.ReactNode;
  darkerBackground?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onClose?: () => void;
  width?: "xs" | "sm" | "md" | "lg" | "full";
  height?: "xs" | "sm" | "md" | "lg" | "full";
  hideOnEscape?: boolean;
  className?: string;
  noCloseButton?: boolean;
  innerScroll?: boolean;
  endActions?: React.ReactNode;
  // actions?: React.ReactNode;
  unmountOnHide?: boolean;
}

export const Modal = forwardRef<HTMLButtonElement, ModalProps>(
  (
    {
      children,
      title,
      content,
      setOpen,
      onClose,
      open,
      className,
      width = "md",
      height = "md",
      hideOnEscape,
      darkerBackground = false,
      noCloseButton = false,
      innerScroll = false,
      unmountOnHide,
      endActions,
      // actions,
    },
    ref,
  ) => {
    const widthClass = pick(width, {
      xs: tw`max-w-[460px]`,
      sm: tw`max-w-[600px]`,
      md: tw`max-w-[800px]`,
      lg: tw`max-w-[1200px]`,
      full: tw``,
    });
    const heightClass = pick(height, {
      xs: tw``,
      sm: innerScroll ? tw`h-[300px]` : tw`min-h-[300px]`,
      md: innerScroll ? tw`h-[300px]` : tw`min-h-[300px]`,
      lg: innerScroll ? tw`h-[300px]` : tw`min-h-[300px]`,
      full: innerScroll ? tw`h-screen` : tw`min-h-full`,
    });

    const setOpenInternal = useCallback(
      (open: boolean) => {
        if (setOpen) setOpen(open);
        if (!open) {
          onClose?.();
        }
      },
      [onClose, setOpen],
    );

    return (
      <Ariakit.DialogProvider open={open} setOpen={setOpenInternal}>
        {children && <Ariakit.DialogDisclosure ref={ref} render={children} />}
        <Ariakit.Dialog
          backdrop={<Backdrop />}
          hideOnEscape={hideOnEscape}
          unmountOnHide={unmountOnHide}
          className={cn("fixed inset-0 overflow-x-hidden z-50", innerScroll ? "overflow-y-hidden" : "overflow-y-auto")}
          modal
          portal
        >
          <DynamicColorProvider force>
            <div
              className={cn("w-full grid p-5", innerScroll ? "h-full" : "min-h-full")}
              style={{ gridTemplateRows: `1fr`, gridTemplateColumns: `auto` }}
            >
              <Paper
                level="dialog"
                darkerBackground={darkerBackground}
                className={cn(
                  tw`flex flex-col gap-4 outline-hidden p-4 place-self-center w-full overflow-hidden`,
                  widthClass,
                  heightClass,
                  className,
                  innerScroll && tw`h-full`,
                )}
              >
                <PageTitle
                  title={<Ariakit.DialogHeading render={<span />}>{title}</Ariakit.DialogHeading>}
                  endActions={
                    <Fragment>
                      {endActions}
                      {!noCloseButton && <Ariakit.DialogDismiss render={<Button icon={<XIcon />} />} />}
                    </Fragment>
                  }
                  // actions={actions}
                />
                {content}
              </Paper>
            </div>
          </DynamicColorProvider>
        </Ariakit.Dialog>
      </Ariakit.DialogProvider>
    );
  },
);
