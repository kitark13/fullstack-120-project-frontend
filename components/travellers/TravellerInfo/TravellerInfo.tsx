"use client";

import { useState } from "react";
import Image from "next/image";
import useAuthStore from "@/lib/store/authStore";
import PageToggle from "@/components/profile/PageToggle/PageToggle";
import css from "./TravellerInfo.module.css";

export default function TravellerInfo() {
  const user = useAuthStore((state) => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  let userName = "Мандрівник";
  let userDescription = "";
  if (user) {
    if (
      "data" in user &&
      typeof user.data === "object" &&
      user.data !== null &&
      "name" in user.data
    ) {
      userName = (user.data as { name: string }).name;
      userDescription =
        (user.data as { description?: string }).description || "";
    } else if ("name" in user && typeof user.name === "string") {
      userName = user.name;
      userDescription = (user as { description?: string }).description || "";
    }
  }

  const userAvatar =
    user && "avatarUrl" in user && typeof user.avatarUrl === "string"
      ? user.avatarUrl
      : user &&
          "data" in user &&
          typeof user.data === "object" &&
          user.data !== null &&
          "avatarUrl" in user.data &&
          typeof user.data.avatarUrl === "string"
        ? user.data.avatarUrl
        : undefined;

  return (
    <>
      <div className={css.travellerInfoWrapper}>
        <div className={css.travellerInfoContent}>
          <div className={css.userBlock}>
            <Image
              src={userAvatar || "/default-avatar.png"}
              alt={userName}
              className={css.avatar}
              width={80}
              height={80}
            />
            <div className={css.infoContent}>
              <h1 className={css.userName}>{userName}</h1>
              {userDescription && (
                <p className={css.userDescription}>{userDescription}</p>
              )}
            </div>
          </div>
          {/* <button 
            className={css.editButton} 
            type="button" 
            aria-label="Редагувати профіль"
            onClick={() => setIsEditModalOpen(true)}
          >
            Редагувати профіль
          </button> */}
        </div>
      </div>
      <PageToggle />

      {/* 
      {isEditModalOpen && (
        <EditProfileModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
        />
          )} */}
    </>
  );
}

// function EditProfileModal({
//   isOpen,
//   onClose
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) {
//   if (!isOpen) return null;

//   return (
//     <div className={css.modalOverlay} onClick={onClose}>
//       <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
//         <h2>Редагувати профіль</h2>
//         <p>Модалка редагування профілю</p>
//         <button onClick={onClose}>Закрити</button>
//       </div>
//     </div>
//   );
// }
