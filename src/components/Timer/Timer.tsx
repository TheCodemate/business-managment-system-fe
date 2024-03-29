type Props = {
  createdAt?: string;
  timeCap?: number;
};

export const Timer = ({ createdAt = "N/A", timeCap = 120 }: Props) => {
  return (
    <div className="relative flex items-center justify-center min-w-[120px] bg-neutral100 rounded-md overflow-hidden">
      <span className="font-bold">{createdAt}</span>
      <div className={` absolute top-0 left-0 h-full w-1/2 bg-teal-500`}></div>
    </div>
  );
};
