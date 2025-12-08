import { useQuery } from "@tanstack/react-query";
import { getVisionMission } from "@/services/apiAbout.js";

export function useVisionMission() {
  const {
    data: visionMission,
    isLoading,
    error,
  } = useQuery({ queryKey: ["vision-mission"], queryFn: getVisionMission });

  return { visionMission, isLoading, error };
}
