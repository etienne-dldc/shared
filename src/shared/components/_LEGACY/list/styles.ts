// export const LIST_ITEM_ICON_SIZE: Record<TDesignSize, number> = {
//   xs: 16,
//   sm: 18,
//   md: 20,
//   lg: 26,

import { TDefaultDesignContext } from "../../../design/types";

//   smInner: 16,
//   mdInner: 20,
//   lgInner: 26,
// };

export interface ListItemStylesParams {
  design: TDefaultDesignContext;
  selected: "none" | "secondary" | "primary";
  forceHover: boolean;
  forceActive: boolean;
}

export function listItemClassName({ selected, design }: ListItemStylesParams): string {
  console.log({ selected, design });

  return "";
  // const { size, xSize, ySize } = resolveDesignProps(design);

  // const selectedStateClass = pick(selected, {
  //   none: cn(tw`data-active-item:bg-white/5 data-active-item:text-dynamic-200`),
  //   secondary: cn(tw`bg-white/10`, tw`data-active-item:bg-white/5 text-dynamic-200`),
  //   primary: cn(tw`bg-dynamic-600`, tw`data-active-item:bg-dynamic-500 text-white`),
  // });

  // return cn(
  //   tw`rounded-md`,
  //   tw`flex flex-row items-center justify-center text-left group overflow-hidden relative`,
  //   tw`outline-hidden`,
  //   buttonSizeClass(size, xSize, ySize),
  //   selectedStateClass,
  // );
}
