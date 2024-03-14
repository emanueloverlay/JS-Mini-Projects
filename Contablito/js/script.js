const tablePrint = document.getElementById("tablePrint");
const totalPrint = document.getElementById("totalPrint");
const description = document.getElementById("description");
const subTotal = document.getElementById("subTotal");
const submitBtn = document.getElementById("submitBtn");
let  total;
let iva;
let totalCompras = 0;
let totalVentas = 0;

submitBtn.addEventListener("click", (evt) => {

    let optTransact = document.querySelector('input[name="optTransact"]:checked').value;
    let optIva = document.querySelector('input[name="optIva"]:checked').value;

switch (optIva) {
  case '22':
    total = (subTotal.value * 1.22);
    iva = total - subTotal.value;
    break;
    case '10':
        total = (subTotal.value * 1.10);
        iva = total - subTotal.value;
    break;
    case '0':
        total = subTotal.value;
        iva = 0;
    break;
};

switch (optTransact) {
    case 'Compra':
       totalCompras += parseInt(subTotal.value);
      break;
      case 'Venta':
       totalVentas += parseInt(subTotal.value);
      break;
};

    tablePrint.innerHTML += `
    <tr>
    <td>${description.value}</td>
    <td>${optTransact}</td>
    <td>${subTotal.value}</td>
    <td>${Math.round(iva)}</td>
    <td>${Math.round(total)}</td>
    </tr>
    `;

    totalPrint.innerHTML = `<p>Total ventas: $ ${totalVentas}           Total compras: $ ${totalCompras}</p>`;

    description.value = "";
    subTotal.value = "";
    
    });