export interface TSelectItem<Value extends string> {
  value: Value;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}
