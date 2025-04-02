import * as Ariakit from "@ariakit/react";
import { CheckSquare, Square } from "@phosphor-icons/react";
import { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { BUTTON_ICON_SIZE } from "../button/styles";
import { IconBox } from "../common/IconBox";
import { DesignContext, TDesignSize } from "../core/DesignContext";

interface CheckBoxProps extends Omit<ComponentPropsWithoutRef<"input">, "checked" | "onChange" | "size"> {
  checked: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: TDesignSize;
}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(function Checkbox(
  { checked, onChange, className, ...props },
  ref,
) {
  const [focusVisible, setFocusVisible] = useState(false);
  const [design, rest] = DesignContext.useProps(props);

  const iconSize = BUTTON_ICON_SIZE[design.size];

  return (
    <label data-checked={checked} data-focus-visible={focusVisible || undefined} className={className}>
      <Ariakit.VisuallyHidden>
        <Ariakit.Checkbox
          {...rest}
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
        <IconBox size={iconSize} icon={checked ? <CheckSquare weight="fill" /> : <Square weight="bold" />} />
      </div>
    </label>
  );
});
