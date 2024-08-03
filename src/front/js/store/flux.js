const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      styles: [],
    },
    actions: {
      register: async (email, password, is_brewer, country) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password, country, is_brewer }),
            }
          );
          if (!response.ok) {
            return false;
          }
          const data = response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      login: async (email, password) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          localStorage.setItem("token", data.token);
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      logout: () => {
        localStorage.removeItem("token");
      },
      getStyles: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/styles");
          const data = await response.json();
          if (response.ok) {
            setStore({ styles: data });
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
