type Props = {
  firstName: string;
  lastName: string;
  url?: string;
};

export const Avatar = ({ firstName, lastName, url }: Props) => {
  return (
    <div className="flex justify-center items-center rounded-[100%] w-14 h-14 bg-neutral-100 border-sky-500 border-2 font-bold text-neutral600 cursor-pointer">
      {url ? url : `${firstName[0]}${lastName[0]}`}
    </div>
  );
};
