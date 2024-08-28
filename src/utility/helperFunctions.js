export const searchFunction = (search, data, setData) => {
  if (search) {
    const updated = data.filter((e) =>
      e.question.toLowerCase().trim().includes(search.toLowerCase())
    );
    setData(updated);
  } else {
    setData(data);
  }
};

export const handleLogout = () => {
  localStorage.clear();
  // Revoke the Google authentication token
  const auth2 = window.gapi.auth2.getAuthInstance();
  if (auth2 != null) {
    auth2.signOut().then(() => {
      console.log("Google token revoked");
      // Clear user data in your application (e.g., remove tokens from local storage)
    });
  }
};

export const handleOnline = ({ setIsOnlineTriggered, toast, toastId }) => {
  setIsOnlineTriggered(true);
  toast.dismiss(toastId.current); // Dismiss any existing toast
  toastId.current = toast.success("You are now online."); // Show online toast
  // }
};

export const handleOffline = ({ setIsOnlineTriggered, toast, toastId }) => {
  setIsOnlineTriggered(false);
  toast.dismiss(toastId.current); // Dismiss any existing toast
  toastId.current = toast.error("You are now offline."); // Show offline toast
  // }
};
