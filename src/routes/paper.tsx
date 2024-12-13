import { Variants } from "../playground/Variants";
import { Paper } from "../shared/components/common/Paper";

const LEVEL_VARIANTS = {
  background: "background",
  card: "card",
  dialog: "dialog",
  popover: "popover",
} as const;

export function PaperRoute() {
  return (
    <Variants
      initialAxis={{ row: [], column: [] }}
      dimensions={{
        level: LEVEL_VARIANTS,
      }}
      defaultSelected={{
        level: "card",
      }}
      render={({ level }) => {
        return (
          <Paper level={level} className="p-4">
            <div className="w-12 h-12 bg-white/5" />
          </Paper>
        );
      }}
    />
  );
}
