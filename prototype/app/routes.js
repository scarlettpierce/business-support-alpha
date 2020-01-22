const express = require('express');
const router = express.Router();
const request = require('request');
const _ = require('underscore');




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

  //console.log(req)
  // console.log(req.originalUrl);
   console.log(req.query);
  // console.log(req._parsedUrl);
  // console.log(req._parsedUrl.Url);
  //get the filter params
  console.log("------------");
  console.log(req._parsedUrl.query);
  //console.log(req.query["types_of_support"]);

  var params = req._parsedUrl.query;
  if(params){
    params = params.split("[]").join("%5B%5D");
  }
  // redirect to GOV>UK fund finder
  var url  = "https://www.gov.uk/business-finance-support?"+ params;
  
  console.log (url);
  res.redirect(301, url);
  
  // https://www.gov.uk/business-finance-support?types_of_support%5B%5D=finance&types_of_support%5B%5D=equity
  // https://www.gov.uk/business-finance-support?types_of_support%5B%5D=grant&types_of_support%5B%5D=loan
  // http://localhost:3000/results?types_of_support%5B%5D=grant&types_of_support%5B%5D=loan
  // 
  /////////////////////////////////////////////////////////////
  /*
  var len;

  if(params){
    params = params.split("&");
    len = params.length;
  }


  //console.log(params);
  var checks = {};

  // loop through params and split out type and values
  // will id check boxes by id eg 'id="types_of_support-finance"'
  for (var i=0;i<len;i++){
    var str = params[i];
    //console.log(str)
    str = str.split("[]=").join("-");
    //console.log(str);
    checks[str] = true;
    //checks.push({str:'true', name:str, checked:true});
  }

  // then pass these to the pages to render checks and facets/chips
  res.render('results', {
    results: sampleResults,
    checks: checks
  });
 */

});


/*
// example request with params
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
*/



module.exports = router
