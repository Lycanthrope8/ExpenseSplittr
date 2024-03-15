import { profileFormContext } from "../context/ProfileFormContext";
import { useContext } from "react";

export const useProfileForm = () => {
  const context = useContext(profileFormContext);
  if (!context) {
    throw Error(
      "useProfileForm must be used inside a ProfileFormProvider"
    );
  }
  return context;
};
