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
