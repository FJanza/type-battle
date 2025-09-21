"use client";
import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";

import Footer from "src/components/Footer";
import TypewriterText from "src/components/TypeWriterText";
import LanguageButton from "src/components/LanguageButton";
import LoadingSpinner from "src/components/LoadingSpinner";
import DifficultySelector from "src/components/DifficultySelector";
import DatasetSelector from "src/components/DatasetSelector/index";
import {useGameSettings} from "src/context/GameSettings";
import {Button} from "src/components/Button";
import {signOut} from "src/firebase/auth";

export default function Home() {
  const {difficulty, setDifficulty} = useGameSettings();
  const [isStarting, setIsStarting] = useState(false);

  const router = useRouter();
  const {t} = useTranslation();

  function createGame() {
    setIsStarting(true);
    //TODO guardar el id de juego (?
    const gameID = Math.random().toString(36).substring(2, 8);

    router.push(`/game/${gameID}`);
  }

  return (
    <main className="flex flex-col items-center text-gray-100 text-center w-full">
      {!isStarting ? (
        <div className="flex flex-col gap-2 items-center w-full">
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-1"></div>
            <div className="flex items-center justify-center flex-1">
              <TypewriterText text="Type-Battle" className="font-bold" />
            </div>
            <div className="flex items-center justify-end flex-1">
              <LanguageButton />
              <Button
                onClick={() => {
                  signOut();
                }}
              >
                {t("button.logOut")}
              </Button>
            </div>
          </div>

          <DifficultySelector
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
          <DatasetSelector />
        </div>
      ) : (
        <LoadingSpinner text={t("common.loading")} />
      )}

      <button
        onClick={createGame}
        disabled={isStarting}
        className="w-40 lg:w-48 text-white font-bold py-2 px-4 mt-4 rounded border-2 border-white hover:opacity-50 transition-opacity duration-300"
      >
        {isStarting ? t("button.starting") : t("button.startGame")}
      </button>

      <Footer />
    </main>
  );
}
