import { IButton } from "@/interfaces/IButton";

interface IProps {
  button: IButton;
  action: ((param?: any) => void) | (<TData>(param?: any) => Promise<TData>);
  visible: boolean;
}

export default function ButtonAction(props: IProps) {
  const { button, action, visible } = props;

  return (
    <button
      type={`${button.type.type === "submit" ? "submit" : "button"}`}
      className={`btn btn-${button.type.class} ${
        visible ? "d-block" : "d-none"
      } ms-2 d-flex flex-direction-row justify-content-center align-items-center`}
      style={{ height: "45px" }}
      onClick={button.type.type !== "submit" ? action : undefined}
    >
      <i
        className={button.icon.class}
        style={{ fontSize: `${button.icon.size}px` }}
      ></i>
      <span className="ms-1">{button.text}</span>
    </button>
  );
}
