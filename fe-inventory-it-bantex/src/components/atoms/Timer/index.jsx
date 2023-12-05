import React, { useState, useEffect } from "react";
import { signOut } from "../../../config/Auth";

const Timer = () => {
  const initialTime = parseInt(localStorage.getItem("timer") || "3600", 10); // 1 jam dalam detik
  const [time, setTime] = useState(initialTime);
  const [timerActive, setTimerActive] = useState(true);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    localStorage.setItem("timer", String(time)); // Simpan nilai timer ke local storage

    const timerInterval = setInterval(() => {
      if (timerActive && time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(timerInterval);
        alert(`Waktu Login `);
        signOut();
        window.location.reload();
        localStorage.removeItem("timer");
      }
    }, 1000);

    // Membersihkan interval saat komponen dibongkar
    return () => clearInterval(timerInterval);
  }, [timerActive, time]);

  return (
    <div>
      <h1>Timer: {formatTime(time)}</h1>
    </div>
  );
};

export default Timer;
