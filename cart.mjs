import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs"; //estensione può essere mjs o js per aver facilità nell'importare i dati e le funzionalità
import { printShopName } from "./core-cart.mjs";

// console.log('Promo', promoCode);
// console.log('Products', products);
// console.log('Users', users);
// console.log('Cart', carts);

//console.log('SHOP NAME: ', core.printShopName());


for (let cartRow of carts) { //quale utente appartiene questo carrelo e quali prodotti ha comprato l'utente
    

    //console.log('RIGA DEL CARRELLO DA STAMPARE', cartRow, '\n')
    let prodottiUtente = cartRow.products;
    let UUIDCorrente = cartRow.user;
    let totaleOrdine = 0;

    let ean = '';
    let nomeProdotto = '';
    let prezzoProdotto ='';
    let rigaRicevuta = '';
    let user = core.getUser(UUIDCorrente);

    let nomeUtente = user.firstName + ' ' + user.lastName;
    let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;

    let rate = core.getPercentageFromPromoCode(promoUtente);


    console.log(" + ----------------------------------------------------- + ");

    //console.log('\nUtente corrente', UUIDCorrente, '\n')
    //Shop Name
    console.log(printShopName());

    const getDate = () => 
        {
            let dayFormatting = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            let date = new Date();
            return date.toLocaleString(`it-IT`, dayFormatting);
        }

    console.log(getDate());
    
    console.log(" * ----------------------------------------------------- * ");
  
    if(prodottiUtente.lenght < 1){
        console.log(`${nomeUtente} NON HA PRODOTTI NEL CARRELLO.`)
    }

    for(let item of prodottiUtente){
        let prodCorrente = core.getProduct(item);
        let ean = prodCorrente.ean;
        let nomeProdotto = core.formatProductName(prodCorrente.name);
        let prezzoProdotto = prodCorrente.price;
        
        let rigaRicevuta = ` [${ean}] \t ${nomeProdotto} \t ${prezzoProdotto.toFixed(2)}`;

        console.log(rigaRicevuta,'\n')
        totaleOrdine += prezzoProdotto;
    }

    //print total
    console.log(" * ----------------------------------------------------- * ");
    totaleOrdine += prezzoProdotto
    console.log (`\nTotal: \t\t\t\t ${Number.parseFloat(totaleOrdine).toFixed(2)}`);
    console.log(" + ----------------------------------------------------- + ");

    //sconto
    let discount = core.getPercentageFromPromoCode(promoUtente)*totaleOrdine;
    console.log(`\nDiscount: \t\t\t\t\t ${Number.parseFloat(discount).toFixed(2)}`);

    let discountedPriceValue = core.discountedPrice(totaleOrdine, rate);

    if(promoUtente !== '' 
    && promoUtente !== undefined
    && promoUtente !== null) {
     //updated total with discount
     
     console.log(`\nTotale Scontato:\t\t\t\t`,discountedPriceValue);

     console.log(`\nPROMOCODE: \t\t\t\t\t ${promoUtente} \n`);
 }

  
    console.log(" + ----------------------------------------------------- + ");
    console.log("\n ** ----------------------------------------------------- ** \n ");

    
    let remain = disponibilitaUtente - discountedPriceValue
    if (promoUtente !== ''
    && promoUtente !== undefined
    && promoUtente !== null)
            if(disponibilitaUtente< discountedPriceValue){
                console.log(`${nomeUtente} ha un credito insufficiente` )
            }
            else 
                console.log(`${nomeUtente} ha un credito rimasto di ${Number.parseFloat(remain).toFixed(2)}`)
        else{
            if(disponibilitaUtente < totaleOrdine)
            console.log(`${nomeUtente} ha un credito insufficiente`)

            else
                console.log(`${nomeUtente} ha un credito rimasto di ${Number.parseFloat(remain).toFixed(2)}`)
        }



 
    console.log(" \n ** ----------------------------------------------------- ** \n\n ");



}

