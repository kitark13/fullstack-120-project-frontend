"use client";

import { api } from "@/lib/api/api";

export default function Istorii() {
  const handleClick = async () => {
    try {
      const res = await api.get("/stories"); // <-- твій endpoint
      console.log("Stories:", res.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Отримати історії</button>
    </div>
  );
}
