import { HStack, Paper, VStack } from "../../../styled-system/jsx";
import { Button } from "../../shared/components/button/Button";
import { Select } from "../../shared/components/select/Select";

export default function PaperPlayground() {
  return (
    <VStack>
      <Paper
        css={{
          display: "flex",
          flexDir: "column",
          p: "20",
          bg: "neutral.925",
          rounded: "2",
          borderWidth: "0__x",
          borderColor: "white/10",
        }}
      >
        925
        <PaperContent />
        <Paper
          css={{
            display: "flex",
            flexDir: "column",
            p: "20",
            bg: "neutral.900",
            rounded: "2",
            borderWidth: "0__x",
            borderColor: "white/10",
          }}
        >
          900
          <PaperContent />
          <Paper
            css={{
              display: "flex",
              flexDir: "column",
              p: "20",
              bg: "neutral.875",
              rounded: "2",
              borderWidth: "0__x",
              borderColor: "white/10",
            }}
          >
            875
            <PaperContent />
          </Paper>
        </Paper>
      </Paper>
    </VStack>
  );
}

function PaperContent() {
  return (
    <HStack>
      <Button variant="solid" color="neutral">
        Neutral Button
      </Button>
      <Button variant="surface" color="neutral">
        Neutral Button
      </Button>

      <Select
        items={[
          { value: "neutral", content: "Neutral" },
          { value: "blue", content: "Blue" },
        ]}
        label="Color"
        value="neutral"
        labelHidden
      />
      <Button variant="subtle" color="neutral">
        Neutral Button
      </Button>
      <Button variant="solid" color="blue">
        Blue Button
      </Button>
      <Button variant="surface" color="blue">
        Blue Button
      </Button>
      <Button variant="subtle" color="blue">
        Blue Button
      </Button>
    </HStack>
  );
}
