export default function ExchangeRateView() {
  return (
    <div className="border rounded bg-light p-4" style={{ height: "200px" }}>
      <div className="w-100">
        <select
          className="form-select w-100 w-md-50"
          style={{ height: "45px" }}
        >
          <option defaultValue="0">Currency</option>
          <option value="1">USD</option>
          <option value="2">EURO</option>
        </select>
      </div>
      <div className="pt-5">
        <span className="fw-bold fs-2">30$</span>
      </div>
    </div>
  );
}
