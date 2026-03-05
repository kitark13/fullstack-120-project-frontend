"use client";

import { useState } from "react";
import TravellerInfo from "@/components/travellers/TravellerInfo/TravellerInfo";
import EditProfileModal from "@/components/profile/EditProfileModal/EditProfileModal";
import useAuthStore from "@/lib/store/authStore";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const authUser = useAuthStore((state) => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <TravellerInfo user={authUser || undefined} />
      {authUser && (
        <button
          className={styles.editButton}
          onClick={() => setIsEditModalOpen(true)}
          aria-label="Редагувати профіль"
          title="Редагувати профіль"
        >
          <svg width={24} height={24}>
            <use href="/sprite-final-opt.svg#icon-edit" />
          </svg>
          <span>Редагувати профіль</span>
        </button>
      )}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={authUser}
      />
    </>
  );
}
