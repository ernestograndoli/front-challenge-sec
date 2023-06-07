import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function Error() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="row alert alert-danger container" role="alert">
        <div className="col-11">An unexpected error occurred</div>
      </div>
    </div>
  );
}
