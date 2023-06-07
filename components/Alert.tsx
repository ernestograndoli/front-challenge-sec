interface IProps {
  type: "danger" | "warning" | "success" | "info";
  text: string;
}

export default function Alert(props: IProps) {
  const { type, text } = props;
  const icon =
    type === "danger" ? "bi-exclamation-triangle-fill" : "bi-info-circle-fill";

  return (
    <div
      className={`alert alert-${type} d-flex flex-row justify-content-start align-items-center`}
      role="alert"
    >
      <i
        className={`bi ${icon} text-danger`}
        style={{ fontSize: "1.3rem" }}
      ></i>
      <span className="fw-bold ms-2 fs-5">{text}</span>
    </div>
  );
}
