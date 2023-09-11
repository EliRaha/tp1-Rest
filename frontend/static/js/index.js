// 1 router
import aboutCat from "./view/aboutCat.js";
import catlist from "./view/catlist.js";
import catBreeds from "./view/catBreeds.js";
import breedView from "./view/breedView.js";

// Regex function to convert path to regular expression
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// Get parameters from the matched result
const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );
  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};


const router = async () => {
    const routes = [
    { path: "/", view: aboutCat},
    { path: "/about", view: aboutCat},
    { path: "/cat-list", view: catlist},
    { path: "/breed-list", view: catBreeds},
    { path: "/breed/:id", view: breedView},
    { path: "/settings", view: () => console.log('Vue du settings')},
    ]

    const potentialMatches = routes.map((route) => {
        return {
          route: route,
          result: location.pathname.match(pathToRegex(route.path)),
        };
      });
    
      let match = potentialMatches.find(
        (potentialMatch) => potentialMatch.result !== null
      );
    
      if (!match) {
        match = {
          route: routes[0],
          result: [location.pathname],
        };
      }
    
      const view = new match.route.view(getParams(match));
      document.querySelector("#app").innerHTML = await view.getHtml();
    };
    
    window.addEventListener("popstate", router);
    
    const navigateTo = (url) => {
      history.pushState(null, null, url);
      router();
    };
    
    document.addEventListener("DOMContentLoaded", () => {
      document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
          e.preventDefault();
          navigateTo(e.target.href);
        }
      });
      router();
    });    

