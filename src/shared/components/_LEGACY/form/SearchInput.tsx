import { useRef } from "react";
import { Input } from "../../form/Input";

interface SearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function SearchInput({
  value,
  // onValueChange,
  ...inputProps
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Input
      value={value}
      // onValueChange={onValueChange}
      ref={inputRef}
      // endActions={
      //   value.length > 0 && (
      //     <Tooltip content="Effacer">
      //       <Button
      //         className="mr-1.5"
      //         color="red"
      //         startIcon={<BackspaceIcon />}
      //         onClick={() => {
      //           onValueChange("");
      //           inputRef.current?.focus();
      //         }}
      //       />
      //     </Tooltip>
      //   )
      // }
      {...inputProps}
    />
  );
}
