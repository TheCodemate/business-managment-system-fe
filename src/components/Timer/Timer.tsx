import { useEffect, useRef, useState } from "react";

type Props = {
  createdAt: string;
  timeCap?: number;
};

const statusBgColor = {
  high: {
    primary: "#ACFFAF",
    secondary: "#35CE3A",
    text: "#737373",
  },
  medium: {
    primary: "#FEF3C7",
    secondary: "#F59E0B",
    text: "#737373",
  },
  low: {
    primary: "#FFC2C6",
    secondary: "#FB7185",
    text: "#737373",
  },
  expired: {
    primary: "#FF5C67",
    secondary: "#F92444",
    text: "#FFFFFF",
  },
};

export const Timer = ({ createdAt, timeCap = 30 }: Props) => {
  const timerRef = useRef<HTMLDivElement>(null);
  const dateOfCreation = new Date(createdAt);

  const [progressBarLength, setProgressBarLength] = useState(0);
  const [progress, setProgress] = useState<
    "high" | "medium" | "low" | "expired"
  >("high");
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minsLeft, setMinsLeft] = useState(0);

  const getProgressColor = (currentProgress: number) => {
    if (currentProgress >= 100) {
      setProgress("expired");
      return;
    }

    if (currentProgress > 80) {
      setProgress("low");
      return;
    }
    if (currentProgress > 50) {
      setProgress("medium");
      return;
    }

    if (currentProgress > 0) {
      setProgress("high");
      return;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (timerRef.current) {
        const timeCapInMils = timeCap * 60 * 1000;
        const oneMilisecToPixel = timerRef.current.clientWidth / timeCapInMils;
        const creationDateInMil = dateOfCreation.getTime();
        const timePassedInMilis = new Date().getTime() - creationDateInMil;
        const progressInPercentage =
          (timePassedInMilis * oneMilisecToPixel * 100) /
          timerRef.current.clientWidth;

        const hoursLeft = Math.floor(
          (timeCapInMils / 60 / 1000 - timePassedInMilis / 1000 / 60) / 60
        );

        const minsLeft = Math.floor(
          timeCapInMils / 60 / 1000 -
            timePassedInMilis / 1000 / 60 -
            hoursLeft * 60
        );

        getProgressColor(progressInPercentage);
        if (progressBarLength === 0) {
          setProgressBarLength(timePassedInMilis * oneMilisecToPixel);
        }

        if (progressInPercentage >= 100) {
          getProgressColor(progressInPercentage);
          clearInterval(timer);
          return;
        }

        setHoursLeft(hoursLeft);
        setMinsLeft(minsLeft);
        setProgressBarLength((prev) => {
          return prev + oneMilisecToPixel * 1000;
        });
      }
    }, 1000);
  }, []);
  return (
    <div
      ref={timerRef}
      style={{ borderColor: statusBgColor[progress].secondary }}
      className="relative border flex items-center justify-center w-[180px] min-h-[20px] bg-neutral100 rounded-md overflow-hidden"
    >
      <div
        style={{
          width: `${progressBarLength}px`,
          backgroundColor: statusBgColor[progress].primary,
        }}
        className={`absolute top-0 left-0 h-full`}
      ></div>
      <p
        style={{ color: statusBgColor[progress].text }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
      >
        {`${hoursLeft}h ${minsLeft}min`}
      </p>
    </div>
  );
};
