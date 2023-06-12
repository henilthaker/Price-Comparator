const request = require('request');
const cheerio = require('cheerio');
const amazon_search_url = "https://www.amazon.in/s?k=";
const amazon_base_url = "https://www.amazon.in";
const flipkart_search_url = "https://www.flipkart.com/search?q=";
const flipkart_base_url = "https://www.flipkart.com";

const get_flipkart_prod_details = (search_query) => {
    return new Promise((resolve, reject) => {
        request(flipkart_search_url + search_query.replaceAll(' ', '+'), (error, response, html) => {
            
            let $ = cheerio.load(html);

            let card_array = $('._2kHMtA');

            let link = flipkart_base_url + $(card_array[0]).find('._1fQZEK').attr('href');
            
            let image = $(card_array[0]).find('.CXW8mj img').attr('src');
            
            let prod_name = $(card_array[0]).find('._4rR01T').text();
            
            let price = $(card_array[0]).find('._30jeq3._1_WHN1').text().replace('₹', '');

            let prod = { link, image, prod_name, price };

            resolve(prod);
        })
    })
}

const get_amazon_product_details = (search_query) => {
    return new Promise((resolve, reject) => {
        request(amazon_search_url + search_query.replaceAll(' ', '+'), async(error, response, html) => {
            let prod_array = [];
            let $ = cheerio.load(html);
            let card_array = $('.s-card-container');
            let image, link, prod_name, price;
            for (let i = 0; i < 5; i++) {

                link = amazon_base_url + $(card_array[i]).find('.s-product-image-container a').attr('href');

                image = $(card_array[i]).find('.s-product-image-container img').attr('src');

                prod_name = $(card_array[i]).find('h2 span').text();

                price = $(card_array[i]).find('.a-price-whole').text();

                let flipkart_product = await get_flipkart_prod_details(prod_name);

                prod_array.push({ link, image, prod_name, price });
                prod_array.push(flipkart_product);
            }
            resolve(prod_array);
        })
    })
}

const getItems = async (req, res, search_query) => {
    let all_products = await get_amazon_product_details(search_query);
    // let flipkart_prod = [];
    // let product;
    // for(let i=0;i<amazon_prod.length;i++){
    //     product = await get_flipkart_prod_details(amazon_prod[i].name);
    //     flipkart_prod.push(product);
    // }
    console.log(all_products);
    res.status(200).json(all_products);
}

module.exports = { getItems }