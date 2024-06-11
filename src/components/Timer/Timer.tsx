import { useEffect, useRef, useState } from "react";

type Props = {
  createdAt: string;
  timeCap?: number;
  expiredAt: string;
  resolvedAt: string;
  resolved: boolean;
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
  resolved: {
    primary: "#CCCCCC",
    secondary: "#CCCCCC",
    text: "#CCCCCC",
  },
};

export const Timer = ({
  createdAt,
  resolved = false,
  resolvedAt,
  expiredAt,
}: Props) => {
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
        const resolvedDate = new Date(resolvedAt).getTime();
        const timeCapInMils =
          new Date(expiredAt).getTime() - new Date(createdAt).getTime();
        const oneMilisecToPixel = timerRef.current.clientWidth / timeCapInMils;
        const creationDateInMil = dateOfCreation.getTime();
        const timePassedInMilis = resolved
          ? resolvedDate - creationDateInMil
          : new Date().getTime() - creationDateInMil;
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

        if (resolved) {
          clearInterval(timer);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div
      ref={timerRef}
      style={{
        borderColor: resolved
          ? statusBgColor["resolved"].secondary
          : statusBgColor[progress].secondary,
      }}
      className="relative border flex items-center justify-center w-[180px] min-h-[20px] bg-neutral100 rounded-md overflow-hidden"
    >
      <div
        style={{
          width: `${progressBarLength}px`,
          backgroundColor: resolved
            ? statusBgColor["resolved"].primary
            : statusBgColor[progress].primary,
        }}
        className={`absolute top-0 left-0 h-full`}
      ></div>
      <p
        style={{
          color: resolved
            ? statusBgColor["resolved"].text
            : statusBgColor[progress].text,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
      >
        {`${hoursLeft}h ${minsLeft}min`}
      </p>
    </div>
  );
};
