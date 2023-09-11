import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("List Of Cat Breeds");
  }
  async getHtml() {
    try {
      const catData = await getData("/static/data/catBreeds.json");
      const breedList = catData.map(breed => `<li><a href=" https://api.thecatapi.com/v1/images/search?breed_ids=
                                            "${breed.id}
                                            "> 
                                            ${breed.name} 
                                            </a></li>`).join('');
                                            console.log(breedList);
      
      return `
        <h1>List of Cat Breeds</h1>
        <ul>${breedList}</ul>
      `;
    } catch (error) {
      console.log(error);
      return "<p>Error loading cat data.</p>";
    }
  }
}

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}
