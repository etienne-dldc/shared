import { LoadingIcon } from "./LoadingIcon";

export function LoadingBlock() {
  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <LoadingIcon size={60} weight="thin" />
      <div className="uppercase tracking-wider text-sm font-semibold pl-3">
        Loading...
      </div>
    </div>
  );
}
