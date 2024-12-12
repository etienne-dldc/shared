import { Variants } from "../playground/Variants";
import { Paper } from "../shared/components/common/Paper";

export function PaperRoute() {
  return (
    <Variants
      initialAxis={{ row: [], column: [] }}
      defaultSelected={{}}
      dimensions={{}}
      render={() => {
        return (
          <Paper level="popover">
            <div className="w-12 h-12 bg-blue-300" />
          </Paper>
        );
      }}
    />
  );
}
