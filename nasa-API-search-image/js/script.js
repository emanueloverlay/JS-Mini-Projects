const API_URL = "https://images-api.nasa.gov/search?q=";
const INPUTBUSCAR = document.getElementById("inputBuscar");
//const BTNBUSCAR = document.getElementById("btnBuscar");
const FORMBUSCAR = document.getElementById("formBuscar");

//BTNBUSCAR.addEventListener("click", () => {
FORMBUSCAR.addEventListener("submit", (event) => {

   event.preventDefault();

    fetch(API_URL + INPUTBUSCAR.value)
        .then(res => {
            if (res.ok) { return res.json() }
            else { console.log('Error en el fetch') }
        })
        .then(data => {
            let htmlContentToAppend = "";

            if (data.collection && data.collection.items.length > 0) {

                const {
                    collection: { items },
                } = data;

                for (let item of items) {
                    const {
                        data: [galaxy],
                        links
                    } = item;

                    const { description, title, date_created } = galaxy;
                    let href = "";

                    if (links && links.length > 0){
                        href = links[0].href;
                    }

                    htmlContentToAppend +=

                        `  <div class="col-sm p-4">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" style="height:225px; width: 100%;"src="${href}" />
                    <div class="card-body">
                        <b class="card-title">${title}</b>
                        <div class="card-text" style="overflow-y:scroll; height: 110px;">${description}</div>
                        <p class="card-text">${date_created}</p>
                    </div>
                </div>
                </div>`;
                }
            } else {
                htmlContentToAppend = "<p>Nada por mostrar</p>";
            }

            document.getElementById("contenedor").innerHTML = htmlContentToAppend;

        }).catch(event => {
            console.log(event);
        });
});