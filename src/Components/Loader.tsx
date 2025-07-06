import { useAppSelector } from "@/redux/hooks";
import { ClockLoader } from "react-spinners";

export default function Loader() {
  const isGlobalLoading = useAppSelector((state) => state.isLoading.isLoading);

  if (isGlobalLoading)
    return (
      //   <div className="flex items-center justify-center h-screen">
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <ClockLoader size={200} color="purple" speedMultiplier={2} />
      </div>
    );
}
