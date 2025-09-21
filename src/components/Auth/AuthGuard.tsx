"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {auth} from "../../utils/firebase";
import ModalNotLogged from "./ModalNotLogged";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({
  children,
  requireAuth = true,
}: AuthGuardProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && requireAuth) {
        setShowModal(true);
        router.replace("/");
      } else {
        setShowModal(false);
      }
      setChecking(false);
    });
    return () => unsubscribe();
  }, [requireAuth, router]);

  if (checking) return null;

  return (
    <>
      {showModal && <ModalNotLogged />}
      {children}
    </>
  );
}
