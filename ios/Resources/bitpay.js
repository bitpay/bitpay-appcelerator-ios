function Bitpay() {

}
Bitpay.prototype.init = function () {}

//pass a custom config object, or use the Ti.App.xml file
Bitpay.configure = function (config) {
    if (config != undefined) {
        this.API_URL = config.API_URL
        this.API_KEY = config.API_KEY
        this.API_CURRENCY = config.API_CURRENCY
    } else {
        //defaults from Ti.App.xml
        this.API_URL = Ti.App.Properties.getString('bitpayapi')
        this.API_KEY = Ti.App.Properties.getString('bitpayapikey')
        this.API_CURRENCY = Ti.App.Properties.getString('bitpaycurrency')
    }
}

Bitpay.getCurrency = function () {
    return this.API_CURRENCY
}

Bitpay.getAPIKey = function () {
    return this.API_KEY
}

Bitpay.getAPI = function () {
    return this.API_URL
}

Bitpay.remote = function (method, url) {
    var xhr_remote = Titanium.Network.createHTTPClient({
        validatesSecureCertificate: true,
    });
    xhr_remote.open(method, url);
    return xhr_remote;

}

Bitpay.sendTransaction = function (item) {

    var that = this
    var xhr = this.remote("POST", this.getAPI());
    console.log('this.getCurrency()', this.getCurrency())
    item.currency = this.getCurrency()
    xhr.send(item)
    console.log('item', item)
    xhr.onerror = function () {
        console.log(this.responseText)
    }

    xhr.onload = function () {
        console.log('this.responseText', this.responseText)
        var response = JSON.parse(this.responseText)
        if (response.status == 'success') {
            //that.showAppModal(response)
            that.showWebModal(response)
        } else {
            var errd = Titanium.UI.createAlertDialog({
                title: 'Error',
                message: response.msg,
                buttonNames: ['OK']
            })
            errd.show();
        }
    }
}


//bitcoin:?r=https://test.bitpay.com/i/Wk1PoGHWRkvDAzPzbCs6Lo
Bitpay.showAppModal = function (obj) {
    console.log('btc: ','bitcoin:?r='+obj.invoice_url)
    if(Ti.Platform.canOpenURL(obj.invoice_url)){
    Ti.Platform.openURL('bitcoin:?r='+obj.invoice_url)
    }else{
        var errd = Titanium.UI.CreateAlertDialog({
            title:'Bitpay App not installed',
            message:'Please install the BitPay mobile app to continue',
            buttonNames:['OK','Cancel']
        })
        errd.show()
    }
}


Bitpay.showWebModal = function (obj) {
    var webview = Titanium.UI.createWebView({
        url: obj.invoice_url,
    });

    var webwin = Titanium.UI.createWindow({
        top: 20,
        backgroundColor: '#fff',
        layout: 'vertical',
    });

    var headerView = Titanium.UI.createView({
        height: 40,
        left: 0,
        right: 0,
        backgroundColor: '#0A2047'
    });
    webwin.add(headerView)

    var closeLbl = Titanium.UI.createLabel({
        left: 20,
        color: '#fff',
        text: 'Close'
    });
    headerView.add(closeLbl)
    
    var transLbl = Titanium.UI.createLabel({
        right: 10,
        color: '#fff',
        font: {
            fontSize: 12
        },
        text: obj.invoice_id
    });
    headerView.add(transLbl)

    closeLbl.addEventListener('click', function () {
        webwin.close();
    });



    webwin.add(webview)
    webwin.open({
        modal: true
    })
}

module.exports = Bitpay;