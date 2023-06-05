"use client";
import { useState } from "react";
import { IButton } from "@/interfaces/IButton";
import ButtonAction from "@/components/ButtonAction";

const buttons: IButton[] = [
  {
    type: { type: "cancel", class: "danger" },
    icon: { class: "bi bi-x", size: 26 },
    text: "Cancel",
  },
  {
    type: { type: "save", class: "success" },
    icon: { class: "bi bi-check", size: 26 },
    text: "Save",
  },
  {
    type: { type: "edit", class: "primary" },
    icon: { class: "bi bi-pencil-square", size: 17 },
    text: "Edit",
  },
];

export default function ExchangeRateSetting() {
  const [showCancel, setShowCancel] = useState<boolean>(false);
  const [showSave, setShowSave] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(true);

  const cancelExchangeRate = () => {
    setShowCancel(false);
    setShowSave(false);
    setShowEdit(true);
  };

  const saveExchangeRate = () => {
    setShowCancel(false);
    setShowSave(false);
    setShowEdit(true);
  };

  const editExchangeRate = () => {
    setShowCancel(true);
    setShowSave(true);
    setShowEdit(false);
  };

  const getButtonAction = (type: string): (() => void) => {
    switch (type) {
      case "cancel":
        return cancelExchangeRate;
      case "save":
        return saveExchangeRate;
      default:
        return editExchangeRate;
    }
  };

  const getButtonVisibility = (type: string) => {
    switch (type) {
      case "cancel":
        return showCancel;
      case "save":
        return showSave;
      default:
        return showEdit;
    }
  };

  return (
    <div className="border rounded bg-light p-4" style={{ height: "200px" }}>
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
      <div className="pt-5 w-100">
        {!showEdit ? (
          <input
            type="number"
            className="form-control fw-bold fs-2"
            value="1.32"
          />
        ) : (
          <span className="fw-bold fs-2">1.32</span>
        )}
      </div>
    </div>
  );
}
