export const isHover = `:is(:hover, [data-hover])`;
export const isDisabled = `:is(:disabled, [disabled], [data-disabled], [aria-disabled=true])`;
export const isFocusWithin = `:is(:focus-within, [data-focus-within])`;
export const isFocusVisible = `:is(:focus-visible, [data-focus-visible])`;
export const isFocusWithinVisible = `:is(:focus-visible, :has(:focus-visible))`;
export const isFocus = `:is(:focus, [data-focus])`;
export const isBefore = "::before";
export const isAfter = "::after";
export const isPlaceholder = "::placeholder";

export const _hover = "&" + isHover;
export const _disabled = "&" + isDisabled;
export const _focusWithin = "&" + isFocusWithin;
export const _focusVisible = "&" + isFocusVisible;
export const _focusWithinVisible = "&" + isFocusWithinVisible;
export const _focus = "&" + isFocus;
export const _before = "&" + isBefore;
export const _after = "&" + isAfter;
export const _placeholder = "&" + isPlaceholder;

export const _firstChild = "*[data-first]";
export const _betweenChild = "*[data-between]";
export const _lastChild = "*[data-last]";
