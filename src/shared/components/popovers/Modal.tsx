import * as Ariakit from "@ariakit/react";
import { XIcon } from "@phosphor-icons/react";
import { Fragment, forwardRef, useCallback } from "react";
import { css } from "../../../../styled-system/css";
import { Backdrop, Paper } from "../../../../styled-system/jsx";
import { pick } from "../../utils/pick";
import { Button } from "../button/Button";
import { PageTitle } from "../layouts/PageTitle";

interface ModalProps {
  children?: React.ReactElement<any>;
  title: string;
  content: React.ReactNode;
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
      noCloseButton = false,
      innerScroll = false,
      unmountOnHide,
      endActions,
    },
    ref,
  ) => {
    const widthClass = pick(width, {
      xs: css.raw({ maxW: "[460px]" }),
      sm: css.raw({ maxW: "[600px]" }),
      md: css.raw({ maxW: "[800px]" }),
      lg: css.raw({ maxW: "[1200px]" }),
      full: css.raw({}),
    });

    const heightClass = pick(height, {
      xs: css.raw({}),
      sm: innerScroll ? css.raw({ h: "[300px]" }) : css.raw({ minH: "[300px]" }),
      md: innerScroll ? css.raw({ h: "[300px]" }) : css.raw({ minH: "[300px]" }),
      lg: innerScroll ? css.raw({ h: "[300px]" }) : css.raw({ minH: "[300px]" }),
      full: innerScroll ? css.raw({ h: "screen" }) : css.raw({ minH: "full" }),
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

    const paperCss = css.raw(
      {
        bg: "neutral.900",
        display: "flex",
        flexDirection: "column",
        gap: "4",
        outline: "none",
        padding: "4",
        placeSelf: "center",
        width: "full",
        overflow: "hidden",
      },
      widthClass,
      heightClass,
      innerScroll ? { height: "full" } : null,
    );

    return (
      <Ariakit.DialogProvider open={open} setOpen={setOpenInternal}>
        {children && <Ariakit.DialogDisclosure ref={ref} render={children} />}
        <Ariakit.Dialog
          backdrop={<Backdrop />}
          hideOnEscape={hideOnEscape}
          unmountOnHide={unmountOnHide}
          className={css({
            position: "fixed",
            inset: "0",
            overflowX: "hidden",
            zIndex: "50",
            ...(innerScroll ? { overflowY: "hidden" } : { overflowY: "auto" }),
          })}
          modal
          portal
        >
          <div
            className={css({
              width: "full",
              display: "grid",
              padding: "5",
              ...(innerScroll ? { height: "full" } : { minHeight: "full" }),
            })}
            style={{ gridTemplateRows: `1fr`, gridTemplateColumns: `auto` }}
          >
            <Paper css={paperCss} className={className}>
              <PageTitle
                title={<Ariakit.DialogHeading render={<span />}>{title}</Ariakit.DialogHeading>}
                endActions={
                  <Fragment>
                    {endActions}
                    {!noCloseButton && (
                      <Ariakit.DialogDismiss
                        render={<Button variant="subtle" startIcon={<XIcon />} children={null} />}
                      />
                    )}
                  </Fragment>
                }
              />
              {content}
            </Paper>
          </div>
        </Ariakit.Dialog>
      </Ariakit.DialogProvider>
    );
  },
);
