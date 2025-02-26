import { IconBox } from "../common/IconBox";

interface EmptyStateProps {
  icon: React.ReactElement<any>;
  text: string;
  action?: React.ReactElement<any>;
}

export function EmptyState({ icon, text, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 gap-2 text-zinc-600">
      <IconBox icon={icon} size={100} weight="light" />
      <div className="flex flex-col gap-4 items-center">
        <p className="text-lg">{text}</p>
        {action}
      </div>
    </div>
  );
}
