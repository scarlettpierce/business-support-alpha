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

router.get('/business-stage', function(req, res, next) {

  
  res.render('business-stage', 
  {  });
});


router.get('/results', function(req, res, next) {

  // TYPE OF SUPPORT CHECKBOXES
  var types = [
    null,
    "finance",
    "equity",
    "grant",
    "loan",
    "expertise-and-advice",
    "recognition-award" 
  ];
  var params = "";
  var typeOfSupport = req.session.data['typeOfSupport'];
  var typeArray = []
  if(typeOfSupport){
    for (var i=0;i<typeOfSupport.length;i++){
      typeArray[i] = types[typeOfSupport[i]];
      if (i===0){
        params = "?";
      }else{
        params += "&"; 
      }
      params += "types_of_support%5B%5D=" + typeArray[i];
    }
  }

  // SIZE RADIO BUTTONS
  var sizes = [null, 'under-10', 'between-10-and-249', 'between-250-and-500','over-500'];
  var businessSize = req.session.data['businessSize'];
  if(businessSize){
    if (params.length===0){
      params = "?";
    }else{
      params += "&"; 
    }
    params += "business_sizes%5B%5D=" + sizes[businessSize];
  }

  // STAGE RADIO BUTTONS
  var stages = [null, 'not-yet-trading', 'start-up', 'established'];
  var businessStage = req.session.data['businessStage'];
  if(businessStage){
     if (params.length===0){
      params = "?";
    }else{
      params += "&"; 
    }
    params += "business_stages%5B%5D=" + stages[businessStage];
  }

  // INDUSTRY SELECT MENU
  var industries = [
    null,
    'agriculture-and-food',
    'business-and-finance',
    'construction',
    'education',
    'health',
    'hospitality-and-catering',
    'information-technology-digital-and-creative',
    'life-sciences',
    'manufacturing',
    'mining',
    'real-estate-and-property',
    'science-and-technology',
    'service-industries',
    'transport-and-distribution',
    'travel-and-leisure',
    'utilities-providers',
    'wholesale-and-retail'
  ];

  var industryType = req.session.data['industryType'];
  var industryArray = [];
  var industryStr = "";
  if(industryType){
    industryStr = industries[ industryType ];
    if (params.length===0){
      params = "?";
    }else{
      params += "&"; 
    }
    params += "industries%5B%5D=" + industryStr;
  }

  // REGION RADIO BUTTONS
  var region = req.session.data['region'].toLowerCase().split(" ").join("-");
  if(region){
      if (params.length===0){
      params = "?";
    }else{
      params += "&"; 
    }
    params += "regions%5B%5D=" + region;
  }
  
  
   // redirect to GOV.UK fund finder with filters
  var url  = "https://www.gov.uk/business-finance-support"+ params;
  
  console.log("redirect to " + url);
  res.redirect(302, url);
  
});



router.get('/test', function(req, res, next) {
 
  // render a local version of the results
  var len;

  if(req._parsedUrl.query){
    params = req._parsedUrl.query.split("&");
    len = params.length;
  }


  // console.log(params);
  var checks = {};

  // loop through params and split out type and values
  // will id check boxes by id eg 'id="types_of_support-finance"'
  for (var i=0;i<len;i++){
    var str = params[i];
    //console.log(str)
    str = str.split("%5B%5D=").join("-");
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
