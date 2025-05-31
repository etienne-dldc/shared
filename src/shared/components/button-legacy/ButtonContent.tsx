import { ComponentPropsWithRef, useMemo } from "react";
import { cn, tw } from "../../styles/utils";
import { isNotNil } from "../../utils/nil";
import { pick } from "../../utils/pick";
import { IconBox } from "../common/IconBox";
import { LoadingIcon } from "../common/LoadingIcon";
import {
  DesignContext,
  resolveDesignProps,
  TDesignContextProps,
  TDesignDirSize,
  TDesignSize,
} from "../core/DesignContext";
import {
  BUTTON_CONTENT_DETAIL_SIZE_CLASS,
  BUTTON_CONTENT_INNER_LEFT_PADDING_CLASS,
  BUTTON_CONTENT_SIZE_CLASS,
  BUTTON_CONTENT_TEXT_LEFT_SPACE,
  BUTTON_CONTENT_TEXT_LEFT_SPACE_NO_ICON,
  BUTTON_CONTENT_TEXT_RIGHT_SPACE,
  BUTTON_CONTENT_TEXT_RIGHT_SPACE_NO_ICON,
  BUTTON_CONTENT_X_SIZE_CLASS,
  BUTTON_CONTENT_Y_SIZE_CLASS,
  BUTTON_ICON_SIZE,
  ICON_X_SIZE_CLASS,
  ICON_Y_SIZE_CLASS,
  INNER_SIZE_MAPPING,
} from "./styles";

interface ButtonContentProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  endAction?: React.ReactNode;
  title?: React.ReactNode;
  size?: TDesignSize;
  xSize?: TDesignDirSize;
  details?: string | React.ReactNode;
  loading?: boolean;
  interactive?: boolean;
}

export function ButtonContent(props: ButtonContentProps) {
  const [
    designBase,
    { icon, endIcon, endAction, title, details, loading, className, interactive = true, ...htmlProps },
  ] = DesignContext.useProps(props);

  const design = resolveDesignProps(designBase);
  const { size, xSize, ySize } = design;

  const hasStartIcon = Boolean(icon || loading);
  const hasEndAction = Boolean(endIcon || endAction);

  const xSizeClass = pick(xSize, BUTTON_CONTENT_X_SIZE_CLASS);
  const ySizeClass = pick(ySize, BUTTON_CONTENT_Y_SIZE_CLASS);

  const textLeftSpace = pick(
    xSize,
    hasStartIcon ? BUTTON_CONTENT_TEXT_LEFT_SPACE : BUTTON_CONTENT_TEXT_LEFT_SPACE_NO_ICON,
  );

  const textRightSpace = pick(
    xSize,
    hasEndAction ? BUTTON_CONTENT_TEXT_RIGHT_SPACE : BUTTON_CONTENT_TEXT_RIGHT_SPACE_NO_ICON,
  );

  const contentSizeClass = pick(xSize, BUTTON_CONTENT_SIZE_CLASS);

  const contentClass = cn(
    tw`flex grow basis-6 justify-center overflow-hidden`,
    textLeftSpace,
    textRightSpace,
    contentSizeClass,
  );

  const titleClass = cn(tw`text-ellipsis whitespace-nowrap overflow-hidden grow`);

  const detailsSizeClass = pick(size, BUTTON_CONTENT_DETAIL_SIZE_CLASS);

  const detailsClass = cn(detailsSizeClass, tw`text-ellipsis whitespace-nowrap overflow-hidden opacity-60`);

  const iconXSizeClass = pick(xSize, ICON_X_SIZE_CLASS);
  const iconYSizeClass = pick(ySize, ICON_Y_SIZE_CLASS);

  const iconClass = cn(tw`flex items-center justify-center rounded-sm`, iconXSizeClass, iconYSizeClass);

  const startIconClass = cn(iconClass, tw`mr-auto`);
  const endIconClass = cn(iconClass, tw`ml-auto`);

  const iconSize = pick(size, BUTTON_ICON_SIZE);
  const innerSize = pick(size, INNER_SIZE_MAPPING);

  const innerDesign = useMemo((): TDesignContextProps => {
    const base = { ...design, size: innerSize, xSize: innerSize, ySize: innerSize };
    if (interactive) {
      return { ...base, filled: true, hoverFilled: false, primary: false };
    }
    return { ...base, filled: true, primary: design.primary ? false : design.primary };
  }, [design, innerSize, interactive]);

  return (
    <div
      className={cn("flex-1 flex flex-row items-center max-w-full", xSizeClass, ySizeClass, className)}
      {...htmlProps}
    >
      {hasStartIcon && <IconBox size={iconSize} className={startIconClass} icon={loading ? <LoadingIcon /> : icon} />}
      {isNotNil(title) && (
        <div className={contentClass}>
          <div className={titleClass}>{title}</div>
          {isNotNil(details) && <div className={detailsClass}>{details}</div>}
        </div>
      )}
      <DesignContext.Provider value={innerDesign}>
        <EndAction endAction={endAction} endIcon={endIcon} iconSize={iconSize} iconClass={endIconClass} xSize={xSize} />
      </DesignContext.Provider>
    </div>
  );
}

interface EndActionProps {
  endIcon: React.ReactNode | undefined;
  endAction: React.ReactNode | undefined;
  iconSize: number;
  iconClass: string;
  xSize: TDesignSize;
}

function EndAction({ endAction, endIcon, iconSize, iconClass, xSize }: EndActionProps) {
  if (endAction) {
    const endActionLeftPadding = pick(xSize, BUTTON_CONTENT_INNER_LEFT_PADDING_CLASS);
    return <div className={cn(tw`ml-auto`, endActionLeftPadding)}>{endAction}</div>;
  }
  if (endIcon) {
    const endIconClass = cn(iconClass, tw`ml-auto`);
    return <IconBox size={iconSize} className={endIconClass} icon={endIcon} />;
  }
  return null;
}
