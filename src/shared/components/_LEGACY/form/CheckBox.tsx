import * as Ariakit from "@ariakit/react";
import { CheckSquareIcon, SquareIcon } from "@phosphor-icons/react";
import { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { IconBox } from "../../common/IconBox";

interface CheckBoxProps extends Omit<ComponentPropsWithoutRef<"input">, "checked" | "onChange" | "size"> {
  checked: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  // size?: TDesignSize;
}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(function Checkbox(
  { checked, onChange, className, ...props },
  ref,
) {
  const [focusVisible, setFocusVisible] = useState(false);
  // const [design, rest] = DesignContext.useProps(props);
  console.log(props);

  // const iconSize = BUTTON_ICON_SIZE[design.size];

  return (
    <label data-checked={checked} data-focus-visible={focusVisible || undefined} className={className}>
      <Ariakit.VisuallyHidden>
        <Ariakit.Checkbox
          // {...rest}
          ref={ref}
          clickOnEnter
          onFocusVisible={() => setFocusVisible(true)}
          onBlur={() => setFocusVisible(false)}
          onChange={(event) => {
            onChange?.(event.target.checked, event);
          }}
        />
      </Ariakit.VisuallyHidden>
      <div className="check" data-checked={checked}>
        <IconBox
          // size={iconSize}
          icon={checked ? <CheckSquareIcon weight="fill" /> : <SquareIcon weight="bold" />}
        />
      </div>
    </label>
  );
});
