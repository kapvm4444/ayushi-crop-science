import { useQuery } from "@tanstack/react-query";
import { getStates, getStateAreas, getDistricts, getTalukas, getVillages } from "@/services/apiLocations.js";

// Hook for States
export function useStates() {
    return useQuery({
        queryKey: ["states"],
        queryFn: getStates,
        staleTime: Infinity, // States rarely change
    });
}

// Hook for State Areas (Dependent on State ID)
export function useStateAreas(stateId) {
    return useQuery({
        queryKey: ["stateAreas", stateId],
        queryFn: () => getStateAreas(stateId),
        enabled: !!stateId, // Only run if stateId is provided
        staleTime: 5 * 60 * 1000,
    });
}

// Hook for Districts (Dependent on State Area ID)
export function useDistricts(stateAreaId) {
    return useQuery({
        queryKey: ["districts", stateAreaId],
        queryFn: () => getDistricts(stateAreaId),
        enabled: !!stateAreaId,
        staleTime: 5 * 60 * 1000,
    });
}

// Hook for Talukas (Dependent on District ID)
export function useTalukas(districtId) {
    return useQuery({
        queryKey: ["talukas", districtId],
        queryFn: () => getTalukas(districtId),
        enabled: !!districtId,
        staleTime: 5 * 60 * 1000,
    });
}

// Hook for Villages (Dependent on Taluka ID)
export function useVillages(talukaId) {
    return useQuery({
        queryKey: ["villages", talukaId],
        queryFn: () => getVillages(talukaId),
        enabled: !!talukaId,
        staleTime: 5 * 60 * 1000,
    });
}
