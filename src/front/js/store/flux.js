const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      styles: [],
      beers: [],
      events: [],
      breweries: [],
      userBreweries: [],
      userBeers: [],
      breweryEvents: [],
      userStyles: [],
      searchResults: [],
    },
    actions: {
      //REGISTER USER//
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
      //LOGIN USER//
      login: async (email, password) => {
        const actions = getActions();
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
      //LOGOUT USER//
      logout: () => {
        localStorage.removeItem("token");
      },

      //ADD BREWERY
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
      //GET BREWERIES//
      getAllBreweries: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/breweries"
          );
          const data = await response.json();
          if (response.ok) {
            console.log(data.breweries);
            setStore({ breweries: data.breweries });
          }
        } catch (error) {
          console.log(error);
        }
      },
      //GET USER BREWERIES //
      getUserBreweries: async () => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/user/breweries",
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setStore({ userBreweries: data.breweries });
          }
        } catch (error) {
          console.log(error);
        }
      },
      //ADD BEER//
      add_beer: async (
        name,
        brewery_id,
        bjcp_style,
        IBUs,
        volALC,
        description,
        picture_of_beer_url
      ) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/create_new_beer",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                name,
                brewery_id,
                bjcp_style,
                IBUs,
                volALC,
                description,
                picture_of_beer_url,
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
      //GET STYLES//
      getStyles: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/styles");
          const data = await response.json();
          if (response.ok) {
            console.log(data);

            setStore({ styles: data.styles });
          }
        } catch (error) {
          console.log(error);
        }
      },
      //GET USER BEERS//
      getUserBeers: async () => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/user/beers",
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setStore({ userBeers: data.beers });
          }
        } catch (error) {
          console.log(error);
        }
      },
      //GET ALL THE BEERS NO JWT REQUIRED//
      getAllBeers: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/beers");
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setStore({ beers: data });
          }
        } catch (error) {
          console.log(error);
        }
      },
      //ADD EVENT//
      add_event: async (
        name,
        brewery_id,
        description,
        date,
        picture_of_event_url
      ) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/create_new_event",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                name,
                brewery_id,
                description,
                date,
                picture_of_event_url,
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
      //GET BREWERY EVENTS//
      getUserEvents: async () => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/brewery/events",
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setStore({ breweryEvents: data.events });
          }
        } catch (error) {
          console.log(error);
        }
      },
      //GET ALL EVENTS (PUBLIC)
      getAllEvents: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/events");
          const data = await response.json();
          if (response.ok) {
            console.log(data);

            setStore({ events: data });
          }
        } catch (error) {
          console.log(error);
        }
      },

      //DELETE BREWERY

      deleteBrewery: async (brewery_id) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/delete_brewery",
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                brewery_id,
              }),
            }
          );
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      //DELETE BEER

      deleteBeer: async (beer_id) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/delete_beer",
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                beer_id,
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

      //DELETE EVENT

      deleteEvent: async (event_id) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/delete_event",
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                event_id,
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
      searchBeers: async (query) => {
        console.log(query)
        try {
          const response = await fetch(
            `${
              process.env.BACKEND_URL
            }/api/search_beers?query=${encodeURIComponent(query)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.text();
            console.error("Error fetching beers:", errorData);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setStore({ beers: data });
        } catch (error) {}
      },
    },
  };
};

export default getState;
