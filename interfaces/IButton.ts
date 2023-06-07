interface IIcon {
  class: string;
  size: number;
}

interface IButtonType {
  type: "cancel" | "submit" | "edit";
  class: "success" | "danger" | "primary";
}

export interface IButton {
  type: IButtonType;
  icon: IIcon;
  text: string;
}
