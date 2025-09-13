import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import estreePlugin from "prettier/plugins/estree";
import tsPlugin from "prettier/plugins/typescript";
import { format } from "prettier/standalone";
import { cloneElement, useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  BundledLanguage,
  BundledTheme,
  codeToHast,
  LanguageRegistration,
  SpecialLanguage,
  StringLiteralUnion,
  ThemeRegistrationAny,
} from "shiki/bundle/web";
import { css } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";
import { Scrollbars } from "../shared/components/common/Scrollbars";

export type TShikiLanguage = LanguageRegistration | StringLiteralUnion<BundledLanguage | SpecialLanguage> | undefined;

export type TShikiTheme = ThemeRegistrationAny | StringLiteralUnion<BundledTheme>;

interface CodeHighlightProps {
  language: TShikiLanguage;
  theme: TShikiTheme;
  children: string;
}

export function CodeHighlight({ language, theme, children }: CodeHighlightProps) {
  const [highlightedCode, setHighlightedCode] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (!language) return;

    const abortController = new AbortController();

    const highlightCode = async () => {
      try {
        const formatted = await format(children, {
          plugins: [tsPlugin, estreePlugin],
          parser: "typescript",
          filepath: "file.tsx",
          semi: false,
          singleQuote: true,
          printWidth: 40,
        });
        // remove leading semi if any
        const withoutLeadingSemi = formatted.replace(/^;\s*/, "");

        const hast = await codeToHast(withoutLeadingSemi, {
          lang: language as StringLiteralUnion<BundledLanguage | SpecialLanguage>,
          theme: theme,
          transformers: [
            {
              name: "remove-background",
              pre(node) {
                // Remove background color from the pre element to use component's background
                if (node.properties.style) {
                  node.properties.style = (node.properties.style as string)
                    .replace(/background-color:[^;]*;?/g, "")
                    .replace(/background:[^;]*;?/g, "");
                }
              },
            },
          ],
        });

        // Check if the request was aborted before setting the result
        if (abortController.signal.aborted) {
          return;
        }

        const result = cloneElement(
          toJsxRuntime(hast, {
            Fragment,
            jsx,
            jsxs,
          }),
        );

        if (abortController.signal.aborted) {
          return;
        }

        setHighlightedCode(result);
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }
        // unset highlighted code
        setHighlightedCode(null);
        console.error(error);
      }
    };

    highlightCode();

    // Cleanup function to abort the request if the effect is cleaned up
    return () => {
      abortController.abort();
    };
  }, [language, theme, children]);

  return (
    <styled.div
      css={{
        minH: "full",
        minW: "full",
        rounded: "2",
        backgroundColor: "neutral.800",
        overflow: "hidden",
      }}
    >
      <Scrollbars className={css({ h: "full", w: "full" })}>
        <styled.div
          css={{
            minH: "full",
            minW: "full",
            "& > *": { h: "full", textStyle: "6", p: "4" },
          }}
        >
          {highlightedCode}
        </styled.div>
      </Scrollbars>
    </styled.div>
  );
}
