import { Variants } from "../../../playground/Variants";
import { Paper } from "./Paper";

const LEVEL_VARIANTS = {
  background: "background",
  card: "card",
  dialog: "dialog",
  popover: "popover",
} as const;

export default function PaperPlayground() {
  return (
    <Variants
      presets={{
        base: { row: [], column: [], selected: {} },
      }}
      dimensions={{ level: LEVEL_VARIANTS }}
      defaultSelected={{ level: "card" }}
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
