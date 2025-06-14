import { GearIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { Fragment } from "react";
import { Paper } from "../../../styled-system/jsx";
import { Button } from "../../shared/components/button/Button";
import { PageTitle } from "../../shared/components/layouts/PageTitle";
import { Modal } from "../../shared/components/popovers/Modal";
import { TDimention, TRenderVariant, TVariantsTreeProps, TVariantsTreeRootAny, TVarientsKeys } from "./types";
import { VariantConfig } from "./VariantConfig";
import { VariantGrid } from "./VariantGrid";
import { variantStoreHooks, VariantStoreProvider } from "./variantStore";

export interface VariantsProps<Tree extends TVariantsTreeRootAny> {
  localStorageKey?: string;
  tree: Tree;
  render: TRenderVariant<TVariantsTreeProps<Tree>>;
  dimentions: TDimention<TVarientsKeys<Tree["data"]>>[];
  base?: TVarientsKeys<Tree["data"]>[];
  configPosition?: "left" | "right" | "top" | "bottom" | "hidden";
  title: string;
  icon?: React.ReactNode;
}

export function Variants<Tree extends TVariantsTreeRootAny>({
  localStorageKey,
  tree,
  render,
  dimentions: initialDimentions,
  base: initialBase = [],
  configPosition: initialConfigPosition = "top",
  title,
  icon = <SquaresFourIcon />,
}: VariantsProps<Tree>) {
  return (
    <VariantStoreProvider
      localStorageKey={localStorageKey}
      tree={tree}
      initialDimentions={initialDimentions as TDimention<string>[]}
      initialConfigPosition={initialConfigPosition}
      initialBase={initialBase as string[]}
      render={render}
    >
      <VariantsInner title={title} icon={icon} />
    </VariantStoreProvider>
  );
}

interface VariantsInnerProps {
  title: string;
  icon?: React.ReactNode;
}

function VariantsInner({ title, icon }: VariantsInnerProps) {
  // const render = variantStoreHooks.useRender();
  const modalOpen = variantStoreHooks.useModalOpen();
  const setModalOpen = variantStoreHooks.useSetModalOpen();

  return (
    <Fragment>
      <Paper level="card" display="flex" flexDirection="column">
        <PageTitle
          icon={icon}
          title={title}
          css={{ p: "3", pb: "0" }}
          endActions={<Button variant="ghost" onClick={() => setModalOpen(true)} startIcon={<GearIcon />} />}
        />
        <VariantGrid />
      </Paper>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Configure Variants"
        content={<VariantConfig />}
        width="full"
        height="full"
      />
    </Fragment>
  );
}
