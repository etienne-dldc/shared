import { ComponentPropsWithRef } from "react";
import { css, cx } from "../../../../styled-system/css";
import { styled } from "../../../../styled-system/jsx";
import { SystemStyleObject } from "../../../../styled-system/types";
import { isNotNil } from "../../utils/nil";
import { IconBox } from "../common/IconBox";
import { LoadingIcon } from "../common/LoadingIcon";
import {
  contentToNestedCross,
  DesignContext,
  resolveDesignProps,
  TDesignContentSize,
  TDesignCrossSize,
  TDesignMainSize,
} from "../core/DesignContext";
import { itemContentClass, itemContentFontSizeClass } from "./styles";

interface ItemContentProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  endAction?: React.ReactNode;
  children?: React.ReactNode;
  contentSize?: TDesignContentSize;
  mainSize?: TDesignMainSize;
  details?: string | React.ReactNode;
  loading?: boolean;
  css?: SystemStyleObject;
}

/**
 * Render items horizontally
 * - Set proper padding and spacing
 * - Set font size
 * - Provide nested content size
 */
export function ItemContent(props: ItemContentProps) {
  const [designBase, { icon, endIcon, endAction, children, loading, className, css: cssProp, ...htmlProps }] =
    DesignContext.useProps(props);

  const design = resolveDesignProps(designBase);
  const { contentSize, mainSize, crossSize } = design;

  const endActionResolved = endAction ? (
    <styled.div>{endAction}</styled.div>
  ) : endIcon ? (
    <IconBox css={{ ml: "auto" }} icon={endIcon} />
  ) : null;

  const hasStartIcon = Boolean(icon || loading);
  const hasEndAction = Boolean(endActionResolved);
  const hasChildren = isNotNil(children);

  const iconOnly = (hasStartIcon && !hasChildren && !hasEndAction) || (hasEndAction && !hasStartIcon && !hasChildren);
  const iconOnlyStyles = iconOnly ? css.raw({ mx: "auto" }) : null;

  const nestedContentSize: TDesignCrossSize = contentToNestedCross[design.contentSize] ?? "4";

  return (
    <div
      className={cx(
        css(
          itemContentClass.raw({ mainSize }),
          itemContentFontSizeClass.raw({ contentSize, crossSize }),
          iconOnly && { px: "0" },
          cssProp,
        ),
        className,
      )}
      {...htmlProps}
    >
      <DesignContext.Define crossSize={nestedContentSize} mainSize={props.mainSize}>
        {hasStartIcon && (
          <IconBox css={css.raw({ mr: "auto" }, iconOnlyStyles)} icon={loading ? <LoadingIcon /> : icon} />
        )}
        {isNotNil(children) && (
          <styled.div display="flex" flexGrow={1} alignItems="center" overflow="hidden">
            {children}
          </styled.div>
        )}
        {endAction ? (
          <div className={css({ ml: "auto" }, iconOnlyStyles)}>{endAction}</div>
        ) : endIcon ? (
          <IconBox css={css.raw({ ml: "auto" }, iconOnlyStyles)} icon={endIcon} />
        ) : null}
      </DesignContext.Define>
    </div>
  );
}
