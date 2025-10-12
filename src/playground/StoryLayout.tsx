import { PropsWithChildren } from "react";
import { Grid } from "../../styled-system/jsx";

export function StoryLayout({ children }: PropsWithChildren) {
  return (
    <Grid
      css={{
        mx: "auto",
        maxW: "960px",
        gridTemplateColumns: "1fr 1fr",
        "& > *": { gridColumn: "span 2" },
      }}
    >
      {children}
    </Grid>
  );
}
