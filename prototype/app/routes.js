const express = require('express');
const router = express.Router();
const request = require('request');
const _ = require('underscore');


const API_URI = 'https://ratings.food.gov.uk/';

var format = 'json';
var sortOrder = 'Alpha';

/*
// general search
var searchType = 'search';
var nameStr = 'cafe';
var addressStr = 'strutton ground';
var uri = API_URI+nameStr+'/'+addressStr+'/'+format+'/';
*/

// search address
var searchType = 'search-address';
var addressStr = 'wilton road, london, sw1v';
var postcode = 'SW1H';
var uri = API_URI+searchType+'/'+addressStr+'/1/50/'+format+'/';

/*
// search by coords
var searchType = 'enhanced-search';
var addressStr = 'petty france using co-ordinates';
var lat = -0.135; // 3dp = aprox 350 ft
var long = 51.499;
var uri = API_URI+searchType+'/en-GB/^/^/DISTANCE/0/^/'+lat+'/'+long+'/1/90/'+format+'/';
*/

var locations = [];


var sampleResults = [
  { 
    title:"AD:VENTURE - Leeds City Region",
    description:"Provides free business development support and guidance."
  },
  { 
    title:"Agri-tech Cornwall - Cornwall and the Isles of Scilly",
    description:"Grants and support to increase research, development and innovation in agritech."
  },
  { 
    title:"ART Business Loans - West Midlands",
    description:"Loans for new and existing small businesses to create and safeguard jobs in the West Midlands"
  },
  { 
    title:"Arts University Bournemouth Innovation Vouchers",
    description:"Vouchers to access external expertise, facilities and equipment to help your business innovate and grow."
  },
  { 
    title:"BCRS Business Loans",
    description:"Loans to help small and medium-sized businesses develop and grow."
  },
  { 
    title:"Be inspired at Staffordshire University",
    description:"Offers free support and guidance for graduates of any university in England, Scotland, Wales and Northern Ireland to start a business in Staffordshire."
  },
  { 
    title:"Better Business Finance - UK",
    description:"Free, quick and easy access to a directory of approved finance suppliers for UK businesses."
  },
  { 
    title:"Big Issue Invest - UK",
    description:"Big Issue Invest helps social enterprises and charities by providing loans and investments."
  },
  { 
    title:"Business advice and masterclasses - East of England",
    description:"Advice, workshops, loans and innovation grant services for start-up and trading businesses in Cambridgeshire, Essex, Norfolk and Suffolk"
  },  
  { 
    title:"Business Cash Advance - UK",
    description:"Alternative financing for UK small business owners."
  },  
  { 
    title:"Business Development Grant Scheme – Scarborough",
    description:"Grants to help new start-up and established SMEs looking to grow or relocate to the Borough of Scarborough."
  }
  
  ];

router.get('/', function(req, res, next) {
  res.render('index', {  });
});


router.get('/error', function(req, res, next) {
  res.render('error', { content : {error: {message: "Internal server error"}}});
});



router.get('/results', function(req, res, next) {


  res.render('results', {
    results: sampleResults
  });

/* 
  console.log(uri);
    request(uri, {
      method: "GET",
      headers: {
          'x-api-version': '2',
          'Accept': 'application/json'
        }
      }, function (error, response, body) {

          if (!error && response.statusCode == 200) {
            if(body) {
              dataset = JSON.parse(body);
              console.log(dataset);
              locations = dataset.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail;
              //console.log(locations[0]);

              res.render('results', {
                address: addressStr,
                location: locations
              });

            } else {
              res.render('results', {
                address: addressStr,
                location: []
              });
            }
          } else {
            res.redirect('/error');
          }
      });
 */
});


router.get('/business/:reference', function(req, res) {
  var refID  = req.params.reference;
  var target = {};
  //loop through locations data
  _.each(locations, function(element, index, list){
    //console.log(element.FHRSID);

    if(refID===element.FHRSID){
      target = element;
    }

  })
  res.send({target});
});



module.exports = router
