export default function Loading() {
  return (
    <div
      className="text-center d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <div
        className="spinner-border"
        style={{ height: "5rem", width: "5rem" }}
        role="status"
      ></div>
    </div>
  );
}
