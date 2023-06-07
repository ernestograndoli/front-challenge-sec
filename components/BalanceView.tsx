"use client";
import { useEffect, useState } from "react";
import { formatToCurrency } from "../utils/repository";
import { IExchangeRate } from "@/interfaces/IExchangeRate";
import WalletApi from "@/services/WalletApi";
import ExchangeRateApi from "@/services/ExchangeRateApi";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/Error";

interface IProps {
  setIdExchangeRateSelected: React.Dispatch<number>;
  rate: number;
  addressWallet: string;
}

export default function BalanceView(props: IProps) {
  const { setIdExchangeRateSelected, rate, addressWallet } = props;
  const [exchangeRate, setExchangeRate] = useState<IExchangeRate[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [balanceCurrency, setBalanceCurrency] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");

  const getExchangeRate = () => {
    return ExchangeRateApi.findAll();
  };

  useEffect(() => {
    getExchangeRate()
      .then((response: any) => {
        setExchangeRate(response.data);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setHasError(true);
      });
  }, []);

  useEffect(() => {
    calculateExchange(addressWallet, rate).then((response: any) => {
      if (response.status === 200) {
        setBalanceCurrency(response.data);
      }
    });
  }, [rate]);

  const calculateExchange = async (walletAddress: string, rate: number) => {
    return await WalletApi.getBalanceCurrency(walletAddress, rate);
  };

  const handleChangeExchangeRate = (e: any) => {
    const { value } = e.target;
    const optionText = e.target.options[e.target.selectedIndex].text;
    setIdExchangeRateSelected(value);
    setCurrency(optionText);
    setBalanceCurrency(0);
  };

  return (
    <div className="border rounded bg-light p-4" style={{ height: "200px" }}>
      {isLoading ? (
        <Loading />
      ) : hasError ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="w-100">
            <select
              className="form-select w-100 w-md-50"
              style={{ height: "45px" }}
              onChange={(e) => handleChangeExchangeRate(e)}
            >
              <option defaultValue="-1" value="-1">
                Currency
              </option>
              {exchangeRate?.map((i: IExchangeRate, index: number) => {
                return (
                  <option value={i.id} key={index}>
                    {i.currency}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="pt-5">
            <span className="fw-bold fs-2">
              {formatToCurrency(balanceCurrency, currency)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
