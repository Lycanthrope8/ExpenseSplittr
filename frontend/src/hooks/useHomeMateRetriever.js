import { useAuthContext } from "../hooks/useAuthContext";

const useHomeMateRetriever = async (homeId) => {
    const { user } = useAuthContext();
    try {
        const response = await fetch(`/home/homeMateRetrival?homeId=${homeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to retrieve home mates");
        }

        const data = await response.json();
        // console.log("Home mates:", data.currentMembers);
        return data.currentMembers; // Assuming the response contains currentMembers array
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export default useHomeMateRetriever;
