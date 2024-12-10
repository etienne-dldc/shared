import { ForwardedRef, forwardRef } from "react";
import { StringLike } from "./utils";

export interface TextareaFieldProps {
  name: StringLike;
  label: string;
  labelHidden?: boolean;
  className?: string;
  disabled?: boolean;

  // label?: string;
  // labelHidden?: boolean;
  // placeholder?: string;
  // required?: boolean;
  // className?: string;
  // innerClassName?: string;
  // defaultValue?: string;
  // disabled?: boolean;
  // autoComplete?: string;
  // value?: string;
  // onValueChange?: (value: string) => void;
  // hideIssuesText?: boolean;
}

export const TextareaField = forwardRef(function TextareaField(
  {
    name,
    label,
    labelHidden = false,
    disabled = false,
    ...inputProps
  }: TextareaFieldProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  console.log({
    name,
    label,
    labelHidden,
    disabled,
    inputProps,
    ref,
  });

  return <div>TODO</div>;
  // return (
  //   <div className={cn("flex flex-col", className)}>
  //     <Label hidden={labelHidden} disabled={disabled} render={<Ariakit.FormLabel name={name} />}>
  //       {label}
  //     </Label>
  //     <Textarea
  //       ref={ref}
  //       name={`${name}`}
  //       disabled={disabled}
  //       {...inputProps}
  //       renderTextarea={<Ariakit.Form name={name} />}
  //     />
  //     <Ariakit.FormError name={name} />
  //   </div>
  // );

  // const fieldState = useFieldsState(field);
  // const touchedIssues = fieldState?.touchedIssues ?? null;
  // const name = fieldState?.name;

  // return <Textarea ref={ref} name={name} touchedIssues={touchedIssues} {...inputProps} />;
});
