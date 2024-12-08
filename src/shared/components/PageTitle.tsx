import { cn } from "../styles/utils";
import { IconBox } from "./IconBox";

interface PageTitleProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  details?: React.ReactNode;
  className?: string;
  endActions?: React.ReactNode;
}

export function PageTitle({
  icon,
  title,
  details,
  className,
  endActions,
}: PageTitleProps) {
  return (
    <div
      className={cn("flex flex-row items-center justify-between", className)}
    >
      <div className="flex flex-row pl-1 gap-2">
        {icon && (
          <IconBox size={28} icon={icon} className="p-0.5" weight="bold" />
        )}
        <h1 className="text-2xl font-semibold">
          {title}
          {details && (
            <>
              {" "}
              <span className="font-normal text-white/60">{details}</span>
            </>
          )}
        </h1>
      </div>
      {endActions && (
        <div className="flex flex-row gap-2 ml-auto">{endActions}</div>
      )}
    </div>
  );
}
