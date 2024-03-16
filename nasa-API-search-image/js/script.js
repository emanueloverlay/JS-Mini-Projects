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

                    const { description, title, date_created, nasa_id } = galaxy;
                    let href = "";

                    if (links && links.length > 0) {
                        href = links[0].href;
                    }

                    htmlContentToAppend +=

                        `  <div class="col-sm p-4">
                <div class="card h-100" style="width: 18rem;">
                    <img class="card-img-top" style="height:225px; width: 100%;"src="${href}" />
                    <div class="card-body">
                        <button class="btn btn-sm btn-primary" onclick="viewInfo('${nasa_id}');" data-bs-toggle="modal" data-bs-target="#detailModal">${title}</button>
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

function viewInfo(id) {
    const detailModalLabel = document.getElementById('detailModalLabel')
    const detailModalInfo = document.getElementById('modal-body')

    fetch(API_URL + id)
        .then(res => {
            if (res.ok) { return res.json() }
            else { console.log('Error en el fetch') }
        })
        .then(data => {
            const {
                collection: { items },
            } = data;

                const {
                    data: [galaxy],
                    links
                } = items[0];

                const { description, title, date_created } = galaxy;
                let href = "";

                if (links && links.length > 0) {
                    href = links[0].href;
                }

                detailModalLabel.innerHTML = title;
                detailModalInfo.innerHTML = `
                <img src="${href}">
                <br>
                <br>
            `
                detailModalInfo.innerHTML += description;


        })
}