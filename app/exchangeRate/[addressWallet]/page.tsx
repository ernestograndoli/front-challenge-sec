"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import WalletApi from "@/services/WalletApi";
import Alert from "@/components/Alert";
import ExchangeRateSetting from "@/components/ExchangeRateSetting";
import BalanceView from "@/components/BalanceView";

export default function ExchangeRate() {
  const [idExchangeRateSelected, setIdExchangeRateSelected] =
    useState<number>();
  const [rate, setRate] = useState<number>(0);
  const params = useParams();
  const [isOldWallet, setIsOldWallet] = useState<boolean>();

  useEffect(() => {
    WalletApi.isOldWallet(params.addressWallet).then((response: any) => {
      const { status, data } = response;

      if (status === 200) {
        setIsOldWallet(data);
      } else {
        toast.error("error checking wallet age");
      }
    });
  }, []);

  return (
    <section id="exchangeRate" className="pt-5">
      <div className="container">
        <div className="row d-flex flex-row justify-content-center align-items-center">
          <div className="col-8">
            <h1 className="fw-bold">Exchage Rates</h1>
          </div>
          <div className="col-4 text-end">
            <Link href="/" className="btn btn-primary">
              Back
            </Link>
          </div>
        </div>
        {isOldWallet && (
          <div className="row">
            <div className="col-12 mt-1">
              <Alert type={"danger"} text={"Wallet is old!"} />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-12 col-md-6">
            <ExchangeRateSetting
              idExchangeRateSelected={idExchangeRateSelected}
              setRate={setRate}
            />
          </div>
          <div className="col-12 col-md-6 mt-3 mt-md-0">
            <BalanceView
              setIdExchangeRateSelected={setIdExchangeRateSelected}
              rate={rate}
              addressWallet={params.addressWallet}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
