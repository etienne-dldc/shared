import { BackspaceIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { Button } from "../button/Button";
import { Tooltip } from "../popovers/Tooltip";
import { TextInput } from "./TextInput";

interface SearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function SearchInput({ value, onValueChange, ...inputProps }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <TextInput
      value={value}
      onValueChange={onValueChange}
      ref={inputRef}
      endActions={
        value.length > 0 && (
          <Tooltip content="Effacer">
            <Button
              className="mr-1.5"
              color="red"
              icon={<BackspaceIcon />}
              onClick={() => {
                onValueChange("");
                inputRef.current?.focus();
              }}
            />
          </Tooltip>
        )
      }
      {...inputProps}
    />
  );
}
