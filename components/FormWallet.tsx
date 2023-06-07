import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IWallet } from "@/interfaces/IWallet";
import WalletApi from "@/services/WalletApi";

interface IProps {
  handlerNewWallet: (response: IWallet) => void;
}

const defaultValues: IWallet = {
  id: 0,
  address: "",
  favourite: false,
};

export default function FormWallet(props: IProps) {
  const { handlerNewWallet } = props;
  const [favourite, setFavourite] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues });

  const submitForm = async (wallet: IWallet) => {
    try {
      await WalletApi.create(wallet).then((response: any) => {
        handlerNewWallet(response);
      });
    } catch (e) {
      toast.error("Error creating wallet.");
    }
  };

  const checkAsFavourite = () => {
    setValue("favourite", !favourite);
    setFavourite(!favourite);
  };

  return (
    <div id="formWallet">
      <div className="container">
        <div className="row">
          <div className="col-12 p-3">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div>
                  <label htmlFor="name" className="form-label">
                    Address<span className="ms-1 text-danger">*</span>
                  </label>
                  <label className="ms-1 mb-0 text-danger">
                    {errors.address && (
                      <span>
                        {errors.address.type == "required" &&
                          "This field is required"}
                      </span>
                    )}
                  </label>
                </div>
                <i
                  className={`text-warning bi bi-star${
                    favourite ? "-fill" : ""
                  }`}
                  onClick={checkAsFavourite}
                  title="Check As Favourite"
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <input
                type="text"
                className="form-control mt-1"
                {...register("address", { required: true })}
              />
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
