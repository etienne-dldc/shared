import "./index.css";
import "./shared/css/theme.css";

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Playground } from "./playground/Playground";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<p>Loading...</p>}>
      <Playground />
    </Suspense>
  </StrictMode>,
);
