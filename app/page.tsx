"use client";
import { useEffect, useState, MouseEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import WalletApi from "@/services/WalletApi";
import { IWallet } from "@/interfaces/IWallet";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/Error";
import Modal from "@/components/Modal";
import FormWallet from "@/components/FormWallet";

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();

  const [wallet, setWallet] = useState<IWallet[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showFormWallet, setShowFormWallet] = useState<boolean>(false);

  const getWallet = () => {
    const order = {
      orderBy: params.get("orderBy") || undefined,
      order: params.get("order") || undefined,
    };
    return WalletApi.findAll(order);
  };

  useEffect(() => {
    getWallet()
      .then((response: any) => {
        if (response.status === 200) {
          setWallet(response.data);
        } else {
          console.log("Mostrar error");
        }

        setIsLoading(false);
      })
      .catch((e: any) => {
        console.log("error: ", e);
        setHasError(true);
      });
  }, [params]);

  const addToFavourite = async (walletSelected: IWallet) => {
    const address = walletSelected.address;
    const body = { favourite: !walletSelected.favourite };

    try {
      WalletApi.addToFavourite(address, body).then((response: any) => {
        const walletIndex = wallet!.indexOf(
          wallet!.find((i) => i.id === response!.id) || walletSelected
        );
        wallet![walletIndex] = {
          ...wallet![walletIndex],
          favourite: !walletSelected.favourite,
        };
        if (!walletSelected.favourite) {
          toast.success("Wallet added to favourites successfully.");
        } else {
          toast.success("Wallet removed from favourites successfully.");
        }
        setWallet([...wallet!]);
      });
    } catch (e) {
      console.log("Error adding wallet to favourite", e);
    }
  };

  const orderByFavourite = (order: string) => {
    router.push(`/?orderBy=favourite&order=${order}`);
  };

  const handlerNewWallet = (response: any) => {
    if (response.status === 200) {
      const aux = [...wallet!, response.data];
      setWallet(aux);
    } else {
      toast.error(response.data);
    }
    handlerShowModal();
  };

  const handlerShowModal = () => {
    setShowFormWallet(!showFormWallet);
  };

  const deleteWallet = (walletSelected: IWallet) => {
    const address = walletSelected.address;

    try {
      WalletApi.delete(address).then((response: any) => {
        const auxWallet = [...wallet!];
        const walletIndex = wallet!.indexOf(
          wallet!.find((i) => i.id === walletSelected!.id) || walletSelected
        );
        auxWallet.splice(walletIndex, 1);
        setWallet(auxWallet);
        toast.success("Wallet removed successfully.");
      });
    } catch (e) {
      console.log("Error adding wallet to favourite", e);
    }
  };

  return (
    <>
      {showFormWallet && (
        <Modal
          title={"Create Wallet"}
          hasFooter={true}
          handleClose={handlerShowModal}
        >
          <FormWallet handlerNewWallet={handlerNewWallet}></FormWallet>
        </Modal>
      )}
      <section id="wallets" className="pt-5">
        <div className="container">
          <div className="row d-flex flex-row justify-content-center align-items-center">
            <div className="col-6">
              <h1 className="fw-bold">Wallets</h1>
            </div>
            <div className="col-6 text-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlerShowModal}
              >
                Create
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="mt-5">
              <Loading />
            </div>
          ) : hasError ? (
            <ErrorComponent />
          ) : (
            <div className="row">
              <div className="col-12">
                <div className="table-responsive-sm table-responsive-md table-responsive-lg mt-3">
                  <table className="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th>Address</th>
                        <th>
                          <div
                            className="d-flex flex-row justify-content-center align-items-end"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              orderByFavourite(
                                params.get("order") === "ASC" ? "DESC" : "ASC"
                              )
                            }
                          >
                            <span>Favourite</span>
                            <i
                              className={`bi bi-arrow-${
                                params.get("order") === "ASC" ? "up" : "down"
                              }-short`}
                              style={{ fontSize: "20px" }}
                            ></i>
                          </div>
                        </th>
                        <th className="text-center">Exchange</th>
                        <th className="text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wallet?.map((wallet: IWallet, index: number) => {
                        return (
                          <tr key={index}>
                            <td>{wallet.address}</td>
                            <td className="text-center">
                              <i
                                className={`text-warning bi bi-star${
                                  wallet.favourite ? "-fill" : ""
                                }`}
                                style={{ fontSize: "18px", cursor: "pointer" }}
                                onClick={() => addToFavourite(wallet)}
                              ></i>
                            </td>
                            <td className="text-center">
                              <Link
                                href={`/exchangeRate/${wallet.address}`}
                                className="text-success"
                                title="Exchange rate"
                              >
                                <i
                                  className="bi bi-currency-exchange"
                                  style={{ fontSize: "22px" }}
                                ></i>
                              </Link>
                            </td>
                            <td className="text-center">
                              <i
                                className={`text-danger bi bi-trash`}
                                style={{ fontSize: "18px", cursor: "pointer" }}
                                onClick={() => deleteWallet(wallet)}
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
