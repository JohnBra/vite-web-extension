export interface OptionType {
  action: string;
  label: string;
}

export interface MenuOptionsTypes {
  onSelect: (option: string) => void;
}
