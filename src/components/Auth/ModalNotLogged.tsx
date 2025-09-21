"use client";
import React from "react";
import {useTranslation} from "react-i18next";
import {signInWithGoogle} from "src/firebase/auth";

export default function ModalNotLogged() {
  const {t} = useTranslation();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50 w-full">
      <div className="flex flex-col lg:flex-row gap-4 bg-white p-6 rounded-lg shadow-lg text-black justify-center items-center">
        <div className="flex flex-col px-4 py-2 rounded w-full sm:w-auto text-red">
          <h3>{t("ModalNotLogged.loginWith")}</h3>
          <div>
            <button onClick={() => signInWithGoogle()}>google</button>
          </div>
        </div>
        <div className="flex flex-col px-4 py-2 rounded w-full sm:w-auto text-red">
          <h3>{t("ModalNotLogged.insertYourUsername")}</h3>
          <div></div>
        </div>
      </div>
    </div>
  );
}
