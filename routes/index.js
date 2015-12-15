var express = require('express');
var router = express.Router();
var r = require('jsrsasign');
var pem = require('pem');
var https = require('https');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET request cert page */
router.get('/newrequest', function(req, res, next) {
	res.render('newrequest');
})

router.get('/cert', function(req, res, next) {
	res.render('index', {title: "here is your certificate"});
})

router.post('/', function(req, res) {


  //grab public key from user input
  var userpublicKey = req.body.publicKey;

  //extract key into something usable for validation
  var pubKey = r.KEYUTIL.getKey(userpublicKey);

  //grab unsigned CSR for comparison
  var csr = req.body.csr;

  //grab signed CSR
  var signedcsr = fs.readFile('../server.txt.sig', function(err, data) {
  	if (err) {
  		return console.error(err);
  	}
  });

  var verifier = crypto.createVerify('sha256');
  verifier.update(csr);
  var success = verifier.verify(pubKey, signedcsr);


  console.log(success);
  
  

});

/* GET create cert page */
router.post('/cert', function(req, res, next) {
	//res.render('index', {title: 'Here is your certificate'});

	var caKeyPub = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDCBt+Vyo\
	Z5z7XaODNsg5vJooX2nax4IS3ywVoXl1glyExWVLyUH1ivSgq6587y4CIq/bGMI8n/M\
	9shRH2NR24Da79mwOM+ZHycc/1UcJTN1NZfOgf2acCE3u3YZzYuDv6pr6BidFfC2elvh\
	PZgoh10AM00QwNct3oWhYgTIxTLXOiPr2VZxvRBpiP70myFEECsCFeHJRu+Zm/KMehVu4\
	z4pFuzr7nWRQhfEdakEkGn6mY54zLdB1kLDG2iX/qnyyi7uk0Dzsb6Ap7iIwA6iCEpOLTe\
	IYIAWQCsLp2AF43LnALDyfsI5GbJH1QogZJZVrEedfaCEqoa4098Ff22iB+iBUrHynsi63F\
	Mvv7hjovXB4z6vf/03wWrZKKuhrKNnAwsvM4sYGpbMsqKcgtOF/WwlqisYh5XH2kf0Kv5Am\
	HbufwUqhfS4uEvkoPxx8gNKK3hDJFR0FnO4dKXOvSwt0iyPd8xOFDC++On45DCNV3H3uycme\
	hkFFjuMkRE6NdFkp30DUrmEaPnBGAIZ4AvX5yoTpzA1x/Wuz24wU762hUpPk0e8jGfTiOkY\
	BAmZnT3EgFoaBmmXoYBIXax8HqKvZPo8JaWfUiC4/RBmPIXdAHFIkDzRQirmO/y3zt+QoxE1\
	CDlFtFZ/QUnKncZkrn7K+D1mbdWs+Pb/sp4NlepP8bRjw== jbk67@georgetown.edu";

	var caKeyPEM = "-----BEGIN RSA PRIVATE KEY-----\
	Proc-Type: 4,ENCRYPTED\
DEK-Info: AES-128-CBC,2D51744F44DB965F6550F9BF4BB4F834\
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\
-----END RSA PRIVATE KEY-----\
";
	
	//extract public key from certificate request
	//var requestPubKey = KEYUTIL.getKeyFromCSRPEM(csrPEM);

	//get certificate authority's private key
	var caKey = KEYUTIL.getKey(caKeyPEM);
	//res.render('Request a Certificate');
	
	var cert = new KJUR.asn1x509.Certificate({'prvkeyobj':caKey});
	cert.sign();
	var certPEM = cert.getPEMString();

	console.log(certPEM);

});

module.exports = router;

