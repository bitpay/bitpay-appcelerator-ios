var win;
var dev = true;
if (dev) {
    var Bitpay = require('lib/bitpay');

} else {
    var Bitpay = require('bitpay');

}


Bitpay.configure({
    API_URL: '<your api endpoint>',
    API_KEY: '<your api key>',
    API_CURRENCY: '<currency, ie USD, etc>'
})

exports.getMain = function () {

    win = Titanium.UI.createWindow({
        backgroundColor: '#fff',
        layout: 'vertical'
    });

    var priceLabel1 = Titanium.UI.createLabel({
        top: 10,
        width: '80%',
        height: 50,
        color:'#5E7DE4',
        text:'Item Price',
    });
    win.add(priceLabel1)
    var priceLabel = Titanium.UI.createTextField({
        top: 0,
        width: '80%',
        height: 50,
        borderColor: '#e9e9e9',
        hintText: 'Item Price',
        value: '1.00',
        borderRadius: 10
    });
    win.add(priceLabel)

    var skuLabel1 = Titanium.UI.createLabel({
        top: 5,
        width: '80%',
        height: 50,
        color:'#5E7DE4',
        text:'Sku',
    });
    win.add(skuLabel1)

    var skuLabel = Titanium.UI.createTextField({
        top: 0,
        width: '80%',
        height: 50,
        borderColor: '#e9e9e9',
        hintText: 'Item Sku',
        value: 'abc-123',
        borderRadius: 10
    });
    win.add(skuLabel)

    var descriptionLabel1 = Titanium.UI.createLabel({
        top: 5,
        width: '80%',
        height: 50,
        color:'#5E7DE4',
        text:'Sku',
    });
    win.add(descriptionLabel1)

    var descriptionLabel = Titanium.UI.createTextField({
        top: 0,
        width: '80%',
        height: 50,
        borderColor: '#e9e9e9',
        hintText: 'Description',
        value: 'I am a widget',
        borderRadius: 10
    });
    win.add(descriptionLabel)

    var buyerLabel1 = Titanium.UI.createLabel({
        top: 5,
        width: '80%',
        height: 50,
        color:'#5E7DE4',
        text:'Buyer Email',
    });
    win.add(buyerLabel1)

    var buyerLabel = Titanium.UI.createTextField({
        top: 0,
        width: '80%',
        height: 50,
        borderColor: '#e9e9e9',
        hintText: 'Buyers Email',
        value: 'jlewis@bitpay.com',
        borderRadius: 10
    });
    win.add(buyerLabel)


    var bitpayButton = Titanium.UI.createLabel({

        top: 20,
        color: '#fff',
        backgroundColor: '#5E7DE4',
        width: '80%',
        height: 60,
        borderRadius: 10,
        textAlign: 'center',
        text: 'Create Invoice'

    });
    win.add(bitpayButton)

    bitpayButton.addEventListener('click', function () {
        bitpayButton.text = 'Creating Invoice...'
        //item is the object created by the fields
        var item = {
            'sku': skuLabel.value,
            'description': descriptionLabel.value,
            'price': parseFloat(priceLabel.value),
            'buyer_email': buyerLabel.value
        }

        Bitpay.sendTransaction(item)

    })

    win.addEventListener('focus', function () {
        bitpayButton.text = 'Create Invoice'
    })






    return win
};