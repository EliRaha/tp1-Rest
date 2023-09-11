import AbstractView from "./AbstractView.js"
export default class extends AbstractView{
    constructor(params){
        //super use for bring constructoir from parents to child/key word.
        super(params)
        this.setTitle('aboutCat')
    }
        async getHtml(){
            return `
         <div class="container text-center">
        <h1 class="bg-success text-white h-100 p-4" style="background-color: #333; font-size: 32px; padding: 20px;">Welcome to Cat images library</h1>
        <p class="bg-light p-4">
            All cats are beatifull.
        </p>
        <div class="d-flex justify-content-center">
            <a href="/cat-list" data-link class="btn btn-primary">List of the 10 random cats</a>
        </div>
    </div>
            `;
        }
    }