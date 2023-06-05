import Alert from "@/components/Alert";
import ExchangeRateSetting from "@/components/ExchangeRateSetting";
import ExchangeRateView from "@/components/ExchangeRateView";

export default function Home() {
  return (
    <main className="pt-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Alert />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <ExchangeRateSetting />
          </div>
          <div className="col-12 col-md-6 mt-3 mt-md-0">
            <ExchangeRateView />
          </div>
        </div>
      </div>
    </main>
  );
}
