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


router.get('/', function(req, res, next) {
  res.render('index', {  });
});


router.get('/error', function(req, res, next) {
  res.render('error', { content : {error: {message: "Internal server error"}}});
});



router.get('/results', function(req, res, next) {

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

});

/*

{ FHRSID: '428179',
  LocalAuthorityBusinessID: '01888/0016/0/000',
  BusinessName: 'Starbucks Coffee Company',
  BusinessType: 'Restaurant/Cafe/Canteen',
  BusinessTypeID: '1',
  AddressLine1: '16-18 Palmer Street',
  AddressLine2: 'London',
  AddressLine3: null,
  AddressLine4: null,
  PostCode: 'SW1H 0AD',
  RatingValue: '5',
  RatingKey: 'fhrs_5_en-gb',
  RightToReply: null,
  RatingDate: '17 September 2019',
  LocalAuthorityCode: '533',
  LocalAuthorityName: 'Westminster',
  LocalAuthorityWebSite: 'http://www.westminster.gov.uk/',
  LocalAuthorityEmailAddress: 'foodsafety@westminster.gov.uk',
  Scores:
   { Hygiene: '5', Structural: '5', ConfidenceInManagement: '5' },
  SchemeType: 'FHRS',
  NewRatingPending: 'false',
  Geocode: { Longitude: '-0.135026', Latitude: '51.49898' },
  Distance: '0.00175345677' }


*/
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
