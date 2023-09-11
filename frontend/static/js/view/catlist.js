import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("List Of Cats");
  }
  async getHtml() {
    try {
      const catData = await getData("/static/data/cat.json");
      const catList = catData.map(cat => `<li><img src="${cat.url}" alt="Cat Image"></li>`).join('');
      
      return `
        <h1>List of 10 Random Cats</h1>
        <ul>${catList}</ul>
      `;
    } catch (error) {
      console.error(error);
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
