export default function Alert() {
  return (
    <div
      className="alert alert-danger d-flex flex-row justify-content-start align-items-center"
      role="alert"
    >
      <i
        className="bi bi-exclamation-triangle-fill text-danger"
        style={{ fontSize: "1.3rem" }}
      ></i>
      <span className="fw-bold ms-2 fs-5">Wallet is old!</span>
    </div>
  );
}
