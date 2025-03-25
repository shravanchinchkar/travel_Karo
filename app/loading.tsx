import { LoadingUI } from "@/components/ui/loading-ui";

export default function Loading() {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-blue-50 to-white flex justify-center items-center">
      <LoadingUI />
    </div>
  );
}
