import { createContext, useContext } from "react";
import { useToast } from "@chakra-ui/react";

const NotificationContext = createContext({
  /** Show a toast
   *
   * @param options Object that has title (optional), description and status
   * ("success", "error", "warning" or "info")
   */
  showToast: ({ title, description, status }) => {
    title, description, status;
  },
});

export const NotificationContextProvider = ({ children }) => {
  const toast = useToast();

  const showToast = ({ title, description, status }) => {
    toast.closeAll();

    toast({
      title,
      description,
      status,
      duration: status === "error" ? 3500 : 2000,
      isClosable: false,
      position: "top",
      containerStyle: {
        marginTop: { base: "20px", lg: "100px" },
      },
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        showToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};
