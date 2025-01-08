import * as Ariakit from "@ariakit/react";
import { ArrowCounterClockwise, Check, Warning } from "@phosphor-icons/react";
import { ForwardedRef, forwardRef, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { tw } from "../../styles/utils";
import { Button } from "../button/Button";
import { Paper } from "../common/Paper";
import { DesignContext } from "../core/DesignContext";
import { TextInput, TextInputProps } from "./TextInput";

export type TNumberInputParse = (value: string) => number;

export interface NumberInputProps extends Omit<TextInputProps, "value" | "onChange"> {
  value: number | null;
  onChange?: (value: number | null) => void;
  format?: (value: number) => string;
  parse?: TNumberInputParse;
}

const DEFAULT_FORMAT = (value: number) => value.toString();
const DEFAULT_PARSE = (value: string) => parseFloat(value);

type TEditState =
  | { state: "Empty" }
  | { state: "Unchanged" }
  | { state: "Invalid" }
  | { state: "EditedValid"; value: number }
  | { state: "EditedSuggest"; value: number };

export const NumberInput = forwardRef(function NumberInput(
  { value, onChange, format: formatNum, parse: parseNum, className, ...inputProps }: NumberInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const parse = useCallback(
    (value: string): number | null => {
      if (value === "") return null;
      return (parseNum ?? DEFAULT_PARSE)(value);
    },
    [parseNum],
  );

  const format = useCallback(
    (value: number | null) => {
      if (value === null) return "";
      return (formatNum ?? DEFAULT_FORMAT)(value);
    },
    [formatNum],
  );

  const [inputFocused, setInputFocused] = useState(false);
  const [popoverFocused, setPopoverFocused] = useState(false);
  const [editedRaw, setEditedRaw] = useState<string>(() => format(value));

  useEffect(() => {
    setEditedRaw(format(value));
  }, [format, value]);

  const valueStr = useMemo(() => format(value), [format, value]);

  const state = useMemo((): TEditState => {
    // remove all non-alpha-numeric characters with spaces
    const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9]/g, "");

    const editedParsed = parse(editedRaw);
    if (editedParsed === null) {
      return { state: "Empty" };
    }
    if (editedParsed === value && sanitize(editedRaw) === sanitize(valueStr)) {
      return { state: "Unchanged" };
    }
    if (Number.isNaN(editedParsed)) {
      return { state: "Invalid" };
    }
    const formatValid = sanitize(format(editedParsed)) === sanitize(editedRaw);
    if (formatValid) {
      return { state: "EditedValid", value: editedParsed };
    }
    return { state: "EditedSuggest", value: editedParsed };
  }, [editedRaw, format, parse, value, valueStr]);

  const invalidEdit = state.state === "EditedSuggest" || state.state === "Invalid";

  const focused = inputFocused || popoverFocused;
  const showPopover = focused && invalidEdit;

  const reset = useCallback(() => {
    setEditedRaw(format(value));
  }, [format, value]);

  const accept = useCallback((): boolean => {
    if (state.state === "Empty") {
      if (onChange) {
        onChange(null);
      }
      setEditedRaw("");
      return true;
    }
    if (state.state === "EditedSuggest" || state.state === "EditedValid") {
      if (onChange) {
        onChange(state.value);
      }
      setEditedRaw(format(state.value));
      return true;
    }
    if (state.state === "Unchanged") {
      setEditedRaw(format(value));
      return true;
    }
    return false;
  }, [format, onChange, state, value]);

  const onBlur = useCallback(() => {
    if (state.state === "Empty") {
      if (onChange) {
        onChange(null);
      }
      setEditedRaw("");
      setTimeout(() => {
        setInputFocused(false);
      });
      return true;
    }
    if (state.state === "EditedValid") {
      if (onChange) {
        onChange(state.value);
      }
      setEditedRaw(format(state.value));
      setTimeout(() => {
        setInputFocused(false);
      });
      return true;
    }
    setTimeout(() => {
      setInputFocused(false);
    });
  }, [format, onChange, state]);

  const onInputChange = useCallback(
    (value: string) => {
      if (!onChange) {
        return;
      }
      setEditedRaw(value);
    },
    [onChange],
  );

  return (
    <Ariakit.PopoverProvider
      open={showPopover}
      placement="top-end"
      setOpen={(open) => {
        if (!open) {
          setTimeout(() => setPopoverFocused(false));
        }
      }}
    >
      <Ariakit.PopoverAnchor
        render={
          <TextInput
            {...inputProps}
            ref={ref}
            value={focused ? editedRaw : valueStr}
            onValueChange={onInputChange}
            className={className}
            innerClassName={tw`font-mono text-right`}
            inputClassName="text-right"
            onFocus={() => setInputFocused(true)}
            onBlur={onBlur}
            endActions={
              !focused &&
              invalidEdit && (
                <Ariakit.Tooltip content="Valeur modifiée">
                  <div className="w-10 flex items-center justify-center">
                    <Warning className="w-5 h-5 text-orange-600" />
                  </div>
                </Ariakit.Tooltip>
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const accepted = accept();
                if (accepted) {
                  e.preventDefault();
                }
              }
            }}
          />
        }
      />
      <Ariakit.Popover
        gutter={4}
        render={<Paper level="popover" />}
        className="flex flex-row items-center gap-2 p-2"
        autoFocusOnShow={false}

        // onFocus={() => setPopoverFocused(true)}
        // onBlur={() => {
        //   setTimeout(() => setPopoverFocused(false));
        // }}
        // onFocusOutside={() => {
        //   setTimeout(() => setPopoverFocused(false));
        // }}
      >
        <DesignContext.Provider size="sm">
          {state.state === "EditedSuggest" ? (
            <Fragment>
              <p className="px-2">
                Voulez-vous dire <span className="font-mono px-2">{format(state.value)}</span> ?
              </p>
              <Ariakit.Tooltip content="Accepter">
                <Button icon={<Check />} color="green" onClick={accept} />
              </Ariakit.Tooltip>
              <Ariakit.Tooltip content="Réinitialiser">
                <Button icon={<ArrowCounterClockwise />} color="red" onClick={reset} />
              </Ariakit.Tooltip>
            </Fragment>
          ) : (
            <Fragment>
              <p className="px-2">Nombre invalide</p>
              <Ariakit.Tooltip content="Réinitialiser">
                <Button icon={<ArrowCounterClockwise />} color="red" onClick={reset} />
              </Ariakit.Tooltip>
            </Fragment>
          )}
        </DesignContext.Provider>
      </Ariakit.Popover>
    </Ariakit.PopoverProvider>
  );
});
