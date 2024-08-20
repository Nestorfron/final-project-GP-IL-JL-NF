const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      me: [],
      styles: [],
      beers: [],
      events: [],
      breweries: [],
      userBreweries: [],
      userBeers: [],
      userEvents: [],
      userStyles: [],
      LatLng: [],
      users: [],
      search: [],
      loading: false,
      countries: [
        "Antigua y Barbuda",
        "Argentina",
        "Bahamas",
        "Barbados",
        "Bolivia",
        "Brasil",
        "Canadá",
        "Chile",
        "Colombia",
        "Costa Rica",
        "Cuba",
        "Dominica",
        "Ecuador",
        "Estados Unidos",
        "Granada",
        "Guyana",
        "Jamaica",
        "México",
        "Panamá",
        "Perú",
        "República Dominicana",
        "Surinam",
        "Trinidad y Tobago",
        "Uruguay",
        "Venezuela",
      ],
      bjcp_styles: [
        "Alternative Fermentables Beer",
        "Alternative Grain Beer",
        "Alternative Sugar Beer",
        "Amber Bitter European Beer",
        "Amber Kellerbier",
        "Amber Malty European Lager",
        "Amber and Brown American Beer",
        "American Amber Ale",
        "American Barleywine",
        "American Brown Ale",
        "American IPA",
        "American Lager",
        "American Light Lager",
        "American Pale Ale",
        "American Porter",
        "American Porter and Stout",
        "American Stout",
        "American Strong Ale",
        "American Wheat Beer",
        "American Wild Ale",
        "Australian Sparkling Ale",
        "Autumn Seasonal Beer",
        "Baltic Porter",
        "Belgian Ale",
        "Belgian Blond Ale",
        "Belgian Dark Strong Ale",
        "Belgian Dubbel",
        "Belgian Golden Strong Ale",
        "Belgian IPA",
        "Belgian Pale Ale",
        "Belgian Single",
        "Belgian Tripel",
        "Berliner Weisse",
        "Best Bitter",
        "Biere de Garde",
        "Black IPA",
        "Blonde Ale",
        "Brett Beer",
        "British Bitter",
        "British Golden Ale",
        "British Strong Ale",
        "Brown IPA",
        "British Brown Ale",
        "Brut IPA",
        "California Common",
        "Cider with Herbs/Spices",
        "Cider with Other Fruit",
        "Classic Style Smoked Beer",
        "Clone Beer",
        "Commercial Specialty Beer",
        "Cream Ale",
        "Cyser",
        "Dark British Beer",
        "Dark European Lager",
        "Dark Mild",
        "Doppelbock",
        "Double IPA",
        "Dry Mead",
        "Dunkles Bock",
        "Dunkles Weissbier",
        "Eisbock",
        "English Barleywine",
        "English Cider",
        "English IPA",
        "English Porter",
        "Experimental Beer",
        "Experimental Mead",
        "Festbier",
        "Flanders Red Ale",
        "Foreign Extra Stout",
        "French Cider",
        "Fruit Beer",
        "Fruit Lambic",
        "Fruit and Spice Beer",
        "Fruit and Spice Mead",
        "Gose",
        "Gose (Historical Beer)",
        "Grape Ale",
        "Gueuze",
        "Hazy IPA",
        "Helles Bock",
        "Historical Beer",
        "Historical Mead",
        "Ice Cider",
        "Imperial Stout",
        "International Amber Lager",
        "International Dark Lager",
        "International Lager",
        "International Pale Lager",
        "Irish Beer",
        "Irish Extra Stout",
        "Irish Red Ale",
        "Irish Stout",
        "Kellerbier",
        "Kentucky Common",
        "Kölsch",
        "Lambic",
        "Lichtenhainer",
        "London Brown Ale",
        "Märzen",
        "Melomel",
        "Mixed-Fermentation Sour Beer",
        "Mixed-Style Beer",
        "Munich Dunkel",
        "Munich Helles",
        "New England Cider",
        "New World Cider",
        "New World Perry",
        "Oatmeal Stout",
        "Old Ale",
        "Ordinary Bitter",
        "Oud Bruin",
        "Pale Bitter European Beer",
        "Pale Kellerbier",
        "Pale Malty European Lager",
        "Pale American Ale",
        "Pale Commonwealth Beer",
        "Piwo Grodziskie",
        "Pre-Prohibition Lager",
        "Pre-Prohibition Porter",
        "Rauchbier",
        "Red IPA",
        "Roggenbier",
        "Rye IPA",
        "Sahti",
        "Saison",
        "Schwarzbier",
        "Scottish Ale",
        "Scottish Export",
        "Scottish Heavy",
        "Scottish Light",
        "Semi-Sweet Mead",
        "Session IPA",
        "Specialty Beer",
        "Specialty Fruit Beer",
        "Specialty IPA",
        "Specialty Smoked Beer",
        "Specialty Spice Beer",
        "Specialty Wood-Aged Beer",
        "Specialty Cider and Perry",
        "Spice, Herb, or Vegetable Beer",
        "Stone Fruit Mead",
        "Straight Sour Beer",
        "Strong American Ale",
        "Strong Belgian Ale",
        "Strong Bitter",
        "Strong British Ale",
        "Strong European Beer",
        "Sweet Mead",
        "Sweet Stout",
        "Traditional Mead",
        "Traditional Perry",
        "Trappist Ale",
        "Trappist Single",
        "Tropical Stout",
        "Vienna Lager",
        "Weizenbock",
        "Weissbier",
        "Wheatwine",
        "White IPA",
        "Wild Specialty Beer",
        "Witbier",
        "Winter Seasonal Beer",
        "Wood-Aged Beer",
      ],
      reviews: [],
      averageRatings: [],
    },
    actions: {
      //REGISTER USER//
      register: async (
        email,
        password,
        username,
        is_brewer,
        country,
        profile_picture
      ) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
                username,
                is_brewer,
                country,
                profile_picture,
              }),
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
          actions.getMe();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      //GET ME//
      getMe: async () => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/me", {
            method: "GET",
            headers: {
              authorization: `Bearer ${jwt}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setStore({ me: data });
          }
        } catch (error) {
          console.log(error);
        }
      },
      //LOGOUT USER//
      logout: () => {
        localStorage.removeItem("token");
      },

      setLatLng: (newLocation) => {
        const store = getStore();
        setStore({ LatLng: newLocation });
        console.log(store.LatLng.lat, store.LatLng.lng);
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
        const store = getStore();
        const latitude = store.LatLng.lat;
        const longitude = store.LatLng.lng;
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
                latitude,
                longitude,
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
            setStore({ breweries: data.breweries });
          }
        } catch (error) {
          console.log(error);
        }
      },
      //EDIT BREWERIES//
      edit_breweries: async (
        id,
        name,
        address,
        history,
        facebook_url,
        instagram_url,
        picture_of_brewery_url,
        x_url,
        logo_of_brewery_url
      ) => {
        const actions = getActions();
        const jwt = localStorage.getItem("token");

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/edit_breweries",
            {
              method: "PUT",
              body: JSON.stringify({
                id,
                name,
                address,
                history,
                facebook_url,
                instagram_url,
                picture_of_brewery_url,
                x_url,
                logo_of_brewery_url,
              }),
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            actions.getUserBreweries();
            return true;
          }
        } catch (error) {
          console.log(error);
          return false;
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
            console.log(data);

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

      // EDIT BEERS //
      edit_beer: async (
        id,
        name,
        beer_id,
        bjcp_style,
        IBUs,
        volALC,
        description,
        picture_of_beer_url
      ) => {
        const actions = getActions();
        const jwt = localStorage.getItem("token");

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/edit_beers",
            {
              method: "PUT",
              body: JSON.stringify({
                id,
                name,
                beer_id,
                bjcp_style,
                IBUs,
                volALC,
                description,
                picture_of_beer_url,
              }),
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            actions.getUserBeers();
            return true;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },

      // EDIT EVENTS //
      edit_event: async (
        id,
        name,
        brewery_id,
        date,
        description,
        picture_of_event_url
      ) => {
        const actions = getActions();
        const jwt = localStorage.getItem("token");

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/edit_event",
            {
              method: "PUT",
              body: JSON.stringify({
                id,
                name,
                brewery_id,
                date,
                description,
                picture_of_event_url,
              }),
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            actions.getUserEvents();
            return true;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      //GET STYLES//
      getStyles: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/styles");
          const data = await response.json();
          if (response.ok) {
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
      //GET USER EVENTS//
      getUserEvents: async () => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/user/events",
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setStore({ userEvents: data.events });
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
            setStore({ events: data });
          }
        } catch (error) {
          console.log(error);
        }
      },

      //DELETE BREWERY
      deleteBrewery: async (brewery_id) => {
        const actions = getActions();
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
          actions.getUserBreweries();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      //DELETE BEER
      deleteBeer: async (beer_id) => {
        const actions = getActions();
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
          actions.getUserBeers();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      //DELETE EVENT
      deleteEvent: async (event_id) => {
        const actions = getActions();
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
          actions.getUserEvents();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      getBeerDetails: async (beer_id) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/beer/${beer_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          setStore({ beerDetails: data });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },

      search: async (query) => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/search?query=${query}`
          );
          if (response.ok) {
            const data = await response.json();
            setStore({
              searchResults: {
                beers: data.beers || [],
                breweries: data.breweries || [],
              },
            });
          } else {
            console.error("Error fetching search results");
          }
        } catch (error) {
          console.error("Error in search action:", error);
        }
      },

      // ADD REVIEW //
      addReview: async (beer_id, rating, comment) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/reviews",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({ beer_id, rating, comment }),
            }
          );
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to submit review", errorText);
            return false;
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      // GET BEER REVIEWS //
      getBeerReviews: async (beer_id) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/reviews/${beer_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            console.log(data.reviews);
            setStore({ reviews: data.reviews });
          }
        } catch (error) {
          console.log(error);
        }
      },
      getAllUsers: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/users");
          const data = await response.json();
          if (response.ok) {
            setStore({ users: data });
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      },
      getAverageRatings: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/reviews`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            // Calculate average ratings
            const reviews = data.reviews;
            const beerRatings = reviews.reduce((acc, review) => {
              if (!acc[review.beer_id]) {
                acc[review.beer_id] = { total: 0, count: 0 };
              }
              acc[review.beer_id].total += review.rating;
              acc[review.beer_id].count += 1;
              return acc;
            }, {});

            const averageRatings = Object.keys(beerRatings).reduce(
              (acc, beerId) => {
                const { total, count } = beerRatings[beerId];
                acc[beerId] = (total / count).toFixed(1);
                return acc;
              },
              {}
            );

            setStore({ averageRatings });
          }
        } catch (error) {
          console.log(error);
        }
      },
      deleteReview: async (review_id) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/review/${review_id}`,
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                review_id,
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
