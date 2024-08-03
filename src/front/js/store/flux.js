const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {},
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
      add_brewery: async (
        name,
        address,
        history,
        facebook_url,
        instagram_url,
        picture_of_brewery_url,
        x_url,
        logo_of_brewery_url
      ) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/create_new_brewery",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                name,
                address,
                history,
                facebook_url,
                instagram_url,
                picture_of_brewery_url,
                x_url,
                logo_of_brewery_url,
              }),
            }
          );
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
