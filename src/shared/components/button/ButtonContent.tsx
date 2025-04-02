import { ComponentPropsWithRef } from "react";
import { cn, tw } from "../../styles/utils";
import { isNotNil } from "../../utils/nil";
import { pick } from "../../utils/pick";
import { IconBox } from "../common/IconBox";
import { LoadingIcon } from "../common/LoadingIcon";
import { DesignContext, resolveDesignProps, TDesignDirSize, TDesignSize } from "../core/DesignContext";

interface ButtonContentProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  title?: React.ReactNode;
  size?: TDesignSize;
  xSize?: TDesignDirSize;
  details?: string | React.ReactNode;
  loading?: boolean;
}

export function ButtonContent(props: ButtonContentProps) {
  const [design, { icon, endIcon, title, details, loading, className, ...htmlProps }] = DesignContext.useProps(props);

  const { size, xSize, ySize } = resolveDesignProps(design);

  const hasIcon = Boolean(icon || loading);
  const hasEndIcon = Boolean(endIcon);

  const xSizeClass = pick(xSize, {
    xs: tw`px-1`,
    sm: tw`px-1.5`,
    md: tw`px-1.5`,
    lg: tw`px-2.5`,
  });
  const ySizeClass = pick(ySize, {
    xs: tw`py-1`,
    sm: tw`py-1.5`,
    md: tw`py-1.5`,
    lg: tw`py-2.5`,
  });

  const iconXSizeClass = pick(xSize, {
    xs: tw`px-0.5`,
    sm: tw`px-0.5 `,
    md: tw`px-1`,
    lg: tw`px-1`,
  });
  const iconYSizeClass = pick(ySize, {
    xs: tw`py-0.5`,
    sm: tw`py-0.5`,
    md: tw`py-1`,
    lg: tw`py-1`,
  });

  const iconClass = cn(tw`flex items-center justify-center rounded-sm`, iconXSizeClass, iconYSizeClass);

  const startIconClass = cn(iconClass, tw`mr-auto`);
  const endIconClass = cn(iconClass, tw`ml-auto`);

  const textLeftSpace = pick(
    xSize,
    hasIcon
      ? { xs: tw`pl-1`, sm: tw`pl-1`, md: tw`pl-1.5`, lg: tw`pl-2` }
      : { xs: tw`pl-1.5`, sm: tw`pl-1.5`, md: tw`pl-2`, lg: tw`pl-2.5` },
  );

  const textRightSpace = pick(
    xSize,
    hasEndIcon
      ? { xs: tw`pr-0.5`, sm: tw`pr-0.5`, md: tw`pr-1`, lg: tw`pr-1` }
      : { xs: tw`pr-1.5`, sm: tw`pr-1.5`, md: tw`pr-2`, lg: tw`pr-2.5` },
  );

  const contentSizeClass = pick(xSize, {
    xs: tw`flex-row gap-1`,
    sm: tw`flex-row gap-2`,
    md: tw`flex-col -my-1.5`,
    lg: tw`flex-col -my-2.5`,
  });

  const contentClass = cn(
    tw`flex grow basis-6 justify-center overflow-hidden`,
    textLeftSpace,
    textRightSpace,
    contentSizeClass,
  );

  const titleClass = cn(tw`text-ellipsis whitespace-nowrap overflow-hidden grow`);

  const detailsSizeClass = pick(size, {
    xs: tw``,
    sm: tw``,
    md: tw`text-xs -mt-1 mb-0.5`,
    lg: tw`text-base -mt-1`,
  });

  const detailsClass = cn(detailsSizeClass, tw`text-ellipsis whitespace-nowrap overflow-hidden opacity-60`);

  const iconSize = pick(size, { xs: 16, sm: 16, md: 20, lg: 26 });

  return (
    <div
      className={cn("flex-1 flex flex-row items-center max-w-full", xSizeClass, ySizeClass, className)}
      {...htmlProps}
    >
      {hasIcon && <IconBox size={iconSize} className={startIconClass} icon={loading ? <LoadingIcon /> : icon} />}
      {isNotNil(title) && (
        <div className={contentClass}>
          <div className={titleClass}>{title}</div>
          {isNotNil(details) && <div className={detailsClass}>{details}</div>}
        </div>
      )}
      {endIcon && <IconBox size={iconSize} className={endIconClass} icon={endIcon} />}
    </div>
  );
}
