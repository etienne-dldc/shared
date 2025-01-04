import { nanoid } from "nanoid";
import { useState } from "react";
import { Button } from "../shared/components/button/Button";
import { Finder } from "../shared/components/finder/Finder";
import { FinderPanel } from "../shared/components/finder/FinderPanel";

export function FinderRoute() {
  const [keys, setKeys] = useState<string[]>([nanoid()]);

  const open = (fromIndex: number) => () => {
    setKeys((prev) => [...prev.slice(0, fromIndex + 1), nanoid()]);
  };

  const reset = (fromIndex: number) => () => {
    setKeys((prev) => prev.slice(0, fromIndex + 1));
  };

  const close = (fromIndex: number) => () => {
    setKeys((prev) => prev.slice(0, fromIndex));
  };

  return (
    <Finder className="h-full w-full rounded-lg shadow-lg absolute inset-0">
      {keys.map((key, i) => (
        <FinderPanel
          key={key}
          className="w-full md:w-[600px]"
          isActive={i === keys.length - 1}
        >
          <p>{key}</p>
          <div className="flex flex-col gap-2 p-2">
            <Button onClick={open(i)}>Open</Button>
            <Button onClick={reset(i)}>Reset</Button>
            {i > 0 && <Button onClick={close(i)}>Close</Button>}
          </div>
        </FinderPanel>
      ))}
    </Finder>
  );
}
