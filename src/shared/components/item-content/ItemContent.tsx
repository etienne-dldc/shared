import { ComponentPropsWithRef } from "react";
import { css, cx } from "../../../../styled-system/css";
import { Ellipsis } from "../../../../styled-system/jsx";
import { SystemStyleObject } from "../../../../styled-system/types";
import { isNotNil } from "../../utils/nil";
import { IconBox } from "../common/IconBox";
import { LoadingIcon } from "../common/LoadingIcon";
import {
  contentToNestedHeight,
  DesignContext,
  resolveDesignProps,
  TDesignButtonHeight,
  TDesignContentSize,
  TDesignSpacing,
} from "../core/DesignContext";
import { contentSpaceClass, itemContentClass, itemContentFontSizeClass } from "./styles";

interface ItemContentProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  endAction?: React.ReactNode;
  children?: React.ReactNode;
  contentSize?: TDesignContentSize;
  spacing?: TDesignSpacing;
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
  const { contentSize, spacing: mainSize, height } = design;

  const hasStartIcon = Boolean(icon || loading);
  const hasEndAction = Boolean(endAction || endIcon);
  const hasChildren = isNotNil(children);

  const iconOnly = (hasStartIcon && !hasChildren && !hasEndAction) || (hasEndAction && !hasStartIcon && !hasChildren);
  const iconOnlyStyles = iconOnly ? css.raw({ mx: "auto" }) : null;

  const endActionResolved = endAction ? (
    <div className={css({ ml: "auto" }, iconOnlyStyles)}>{endAction}</div>
  ) : endIcon ? (
    <IconBox css={css.raw({ ml: "auto" }, iconOnlyStyles)} icon={endIcon} />
  ) : null;

  const nestedContentSize: TDesignButtonHeight = contentToNestedHeight[design.contentSize] ?? "4";

  return (
    <div
      className={cx(
        css(
          itemContentClass.raw({ spacing: mainSize }),
          itemContentFontSizeClass.raw({ contentSize, height: height }),
          iconOnly && { px: "0" },
          cssProp,
        ),
        className,
      )}
      {...htmlProps}
    >
      <DesignContext.Define height={nestedContentSize} spacing={props.spacing}>
        {hasStartIcon && (
          <IconBox
            css={css.raw({ mr: "auto" }, iconOnlyStyles)}
            icon={loading ? <LoadingIcon /> : icon}
            data-slot={!iconOnly ? "start-icon" : undefined}
          />
        )}
        {isNotNil(children) && (
          <div
            className={css(
              { display: "flex", flexGrow: 1, alignItems: "center", overflow: "hidden" },
              contentSpaceClass.raw({ spacing: mainSize }),
              hasStartIcon && { pl: "0" },
              hasEndAction && { pr: "0" },
            )}
          >
            {typeof children === "string" ? <Ellipsis>{children}</Ellipsis> : children}
          </div>
        )}
        {endActionResolved}
      </DesignContext.Define>
    </div>
  );
}
