import AbstractView from "./AbstractView.js";
async function getData(url) {

  const response = await fetch(url);
  return response.json();
}


export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.params = params;
    this.setTitle("Cat Breed");
  }

  async getHtml() {
    
    const nu = Number(this.params.id);
    ///////////////////////////////////////////////////////////////    
       const { breeds } = await getData("/static/data/catBreeds.json");
    
    // const iten = await getData("http://localhost:8082/recpies/"+ nu);

////////////////////////////////////////////////////////////

   const item = await breeds.find((item) => item.id === nu);

    console.log(item);

    return ` <main class="p-5">
       <section class=" w-75 m-auto">
        <a href="https://api.thecatapi.com/v1/images/ ${item.reference_image_id}>Breed Image ID: ${item.reference_image_id}</a>
        <h1 class="my-4 text-center"> ${item.name}</h1>
        <p class="py-3">
           ${item.description}
        </p>
        <div><span class="h6">Source:</span> sdfsfdsdf</div>
        
        <a class="mt-4 d-inline-block " href='/breed-list-' data-link><i class="bi bi-arrow-left"></i> Retourner</a>
       </section>
    </main>`;
  }
}

