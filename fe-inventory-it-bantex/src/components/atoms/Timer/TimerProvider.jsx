import React, { useState, useEffect, useContext, createContext } from "react";

// Buat context untuk menyimpan nilai timer
const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [time, setTime] = useState(50);
  const [timerActive, setTimerActive] = useState(true);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timerActive && time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(timerInterval);
        if (!timerActive) {
          alert(`Waktu Login `);
          signOut();
          window.location.reload();
        }
      }
    }, 1000);

    // Membersihkan interval saat komponen dibongkar
    return () => clearInterval(timerInterval);
  }, [timerActive, time]);

  const toggleTimer = () => {
    setTimerActive((prevActive) => !prevActive);
  };

  return (
    <TimerContext.Provider
      value={{ time, timerActive, toggleTimer, formatTime }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const Timer = () => {
  const { time, timerActive, toggleTimer, formatTime } =
    useContext(TimerContext);

  return (
    <div>
      <h1>Timera: {formatTime(time)}</h1>
    </div>
  );
};

export { TimerProvider, Timer };
