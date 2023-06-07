"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ExchangeRateApi from "@/services/ExchangeRateApi";
import { IExchangeRate } from "@/interfaces/IExchangeRate";
import { IButton } from "@/interfaces/IButton";
import ButtonAction from "@/components/ButtonAction";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/Error";

const buttons: IButton[] = [
  {
    type: { type: "cancel", class: "danger" },
    icon: { class: "bi bi-x", size: 22 },
    text: "Cancel",
  },
  {
    type: { type: "submit", class: "success" },
    icon: { class: "bi bi-check", size: 22 },
    text: "Save",
  },
  {
    type: { type: "edit", class: "primary" },
    icon: { class: "bi bi-pencil-square", size: 18 },
    text: "Edit",
  },
];

interface IProps {
  idExchangeRateSelected: number | undefined;
  setRate: React.Dispatch<number>;
}

export default function ExchangeRateSetting(props: IProps) {
  const { idExchangeRateSelected, setRate } = props;
  const [exchangeRate, setExchangeRate] = useState<IExchangeRate>();
  const [showCancel, setShowCancel] = useState<boolean>(false);
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: exchangeRate, values: exchangeRate });

  const getExchangeRate = async (id: number) => {
    return await ExchangeRateApi.findOne(id);
  };

  useEffect(() => {
    if (idExchangeRateSelected && idExchangeRateSelected.toString() !== "-1") {
      resetComponent();
      setIsLoading(true);
      getExchangeRate(idExchangeRateSelected)
        .then((response: any) => {
          setRate(response.data.rate);
          setExchangeRate(response.data);
          setIsLoading(false);
        })
        .catch((data: any) => {
          console.log("error: ", data);
          setHasError(true);
        });
    } else {
      setIsLoading(false);
      setExchangeRate(undefined);
    }
  }, [idExchangeRateSelected]);

  const cancelExchangeRate = () => {
    setShowCancel(false);
    setShowSubmit(false);
    setShowEdit(true);
  };

  const submitExchangeRate = async (exchange: IExchangeRate) => {
    try {
      await ExchangeRateApi.update(exchange.id, exchange).then(
        (response: any) => {
          const { status, data } = response;
          if (status === 200) {
            setExchangeRate(data);
            setRate(data.rate);
          } else {
            console.log("Setear error: ", data);
          }
        }
      );
      setShowCancel(false);
      setShowSubmit(false);
      setShowEdit(true);
      toast.success("Exchange rate updated successfully.");
    } catch (e) {
      console.log("Error updating exchange: ", e);
    }
  };

  const editExchangeRate = () => {
    setShowCancel(true);
    setShowSubmit(true);
    setShowEdit(false);
  };

  const resetComponent = () => {
    setShowCancel(false);
    setShowSubmit(false);
    setShowEdit(true);
  };

  const getButtonAction = (type: string) => {
    switch (type) {
      case "cancel":
        return cancelExchangeRate;
      case "submit":
        return submitExchangeRate;
      default:
        return editExchangeRate;
    }
  };

  const getButtonVisibility = (type: string) => {
    switch (type) {
      case "cancel":
        return showCancel;
      case "submit":
        return showSubmit;
      default:
        return showEdit;
    }
  };

  if (!exchangeRate)
    return (
      <div className="border rounded bg-light p-4" style={{ height: "200px" }}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="row alert alert-info container" role="alert">
            <div className="col-11">Select a currency.</div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="border rounded bg-light p-4" style={{ height: "200px" }}>
      {isLoading ? (
        <Loading />
      ) : hasError ? (
        <ErrorComponent />
      ) : (
        <form onSubmit={handleSubmit(submitExchangeRate)}>
          <div className="w-100 text-end d-flex flex-row justify-content-end align-items-center">
            {buttons.map((button: IButton, index: number) => {
              return (
                <ButtonAction
                  button={button}
                  action={getButtonAction(button.type.type)}
                  visible={getButtonVisibility(button.type.type)}
                  key={index}
                />
              );
            })}
          </div>
          <div className="mt-1 pt-2 w-100">
            <>
              <label htmlFor="name" className="form-label">
                Rate value {!showEdit && <span className="text-danger">*</span>}
              </label>
              <label className="ms-1 mb-0 text-danger">
                {errors.rate && (
                  <span>
                    {errors.rate.type == "required" && "This field is required"}
                  </span>
                )}
              </label>
              <input
                type="number"
                className="form-control fw-bold fs-2"
                id="rate"
                step=".01"
                {...register("rate", { required: true })}
                disabled={!showEdit ? false : true}
              />
            </>
          </div>
        </form>
      )}
    </div>
  );
}
