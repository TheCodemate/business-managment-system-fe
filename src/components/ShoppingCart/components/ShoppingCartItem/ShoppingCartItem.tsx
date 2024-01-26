export const ShoppingCartItem = () => {
  return (
    <li className="border-b border-details pb-2">
      <div className="flex justify-between ">
        <div className="flex  w-20 h-20">
          <img
            src="https://mirage-cdn.thron.com/delivery/public/image/mirage/04927ef7-f95d-4686-bc6d-58b0367346f7/9pkhty/std/2560x0/04927ef7-f95d-4686-bc6d-58b0367346f7?scalemode=centered&format=auto&quality=auto-medium"
            alt=""
          />
        </div>
        <div className="flex-1 flex flex-col justify-between p-2">
          <span className="font-bold">Product name</span>
          <span>569</span>
        </div>
        <div className="flex justify-center items-center p-2">
          <span>62.7 m2</span>
        </div>
      </div>
    </li>
  );
};
