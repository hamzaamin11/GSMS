import { TailSpin } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#1F75FE"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
