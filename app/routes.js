const express = require('express');
const router = express.Router();
const request = require('request');
const _ = require('underscore');

const MYSOCIETY_API_URL = "https://mapit.mysociety.org/postcode/";
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


// for the summary page have specific strings
var displayNames = {
  types_of_support:[],
  business_stages:"",
  industries:[],
  business_sizes:"",
  regions:[],
  aim:""
};

router.get('/summary', function(req, res, next) {
  var facets = {};


  var params = "";

  var aims = [
    null,
    "Buy new equipment",
    "Set up new premises",
    "Hire new staff",
    "Research and Innovation",
    "Market our products",
    "Improve cash flow",
  ];
/* 
  to research and create a product; 
  to buy technology or equipment; 
  to help with cash flow; 
  to increase production; 
  to set up a new premises; 
  to employ more people; 
  to market our products or services
 */
  var legalStructure = [
    null,
    "Not yet trading",
    "Sole Trader",
    "Private Limited Company (LTD)",
    "Public Limited Company (PLC)",
    "Limited Liability Partnership (LLP)",
    "Guarantee Company (Non Profit)",
    "Limited Partnership" 
  ];

    
  var aim = req.session.data['aim'];
  console.log('summary');
  console.log(aim);
  console.log(aims[aim]);
  if(aim){
      /* if (i===0){
        params = "";
        //params = "?";
      }else{
        params += "&"; 
      } */
     // params += "types_of_support%5B%5D=" + typeArray[i];
      displayNames.aim = aims[aim];
  }
    
  //////////////////////////////

/* 
  var businessType = req.session.data['businessType'];
  console.log(businessType);
  console.log(legalStructure[businessType]);
  if(businessType){
      displayNames.region = "London";
      displayNames.region_url = "lep.london/";
  }
    
  var postcode = req.session.data['postcode'];
  console.log(postcode);

  if(postcode){
    var cleaned = postcode.split('%20').join('');
    cleaned = cleaned.split(' ').join('');
    console.log("GOT CODE " + cleaned)
    displayNames.region =;
  }


 */

  //////////////////////////////
  var postcode = req.session.data['postcode'];
  console.log(postcode);
 
  if(postcode){
    var cleaned = postcode.split('%20').join('');
    cleaned = cleaned.split(' ').join('');
    cleaned = cleaned.toUpperCase();
    console.log("GOT CODE " + cleaned)
    //dummy data
      displayNames.region =  `Cornwall (${cleaned})`;
      displayNames.region_name =  `Cornwall`;
      displayNames.region_url = "https://www.cioslep.com/";
  }
    
  var businessType = req.session.data['businessType'];
  console.log(businessType);
  console.log(legalStructure[businessType]);
  if(businessType){
      displayNames.businessType = legalStructure[businessType];
  }

  

/* 
  // TYPE OF SUPPORT CHECKBOXES
  var types = [
    null,
    "finance",
    "equity",
    "grant",
    "loan",
    "expertise-and-advice",
    "recognition-award",
  ];

  var typeOfSupport = req.session.data['typeOfSupport'];
  var typeArray = []
  if(typeOfSupport){
    for (var i=0;i<typeOfSupport.length;i++){

      if(typeOfSupport[i]==="7"){
        params ="";
        break;
      }else{
        
        typeArray[i] = types[typeOfSupport[i]];
        if (i===0){
          params = "";
          //params = "?";
        }else{
          params += "&"; 
        }
        params += "types_of_support%5B%5D=" + typeArray[i];
        displayNames.types_of_support.push(typeArray[i].toLowerCase().split("-").join(" "));
      }
    }
  }
 */


  // SIZE RADIO BUTTONS
  var sizes = [null, 'under-10', 'between-10-and-249', 'between-250-and-500','over-500'];
  var businessSize = req.session.data['businessSize'];
  if(businessSize){
    if (params.length===0){
      params = "";
      //params = "?";
    }else{
      params += "&"; 
    }
    params += "business_sizes%5B%5D=" + sizes[businessSize];
    displayNames.business_sizes = sizes[businessSize].toLowerCase().split("-").join(" ");
  }

  // STAGE RADIO BUTTONS
  var stages = [null, 'not-yet-trading', 'start-up', 'established'];
  var businessStage = req.session.data['businessStage'];
  if(businessStage){
     if (params.length===0){
      params = "";
      //params = "?";
    }else{
      params += "&"; 
    }
    params += "business_stages%5B%5D=" + stages[businessStage];
    displayNames.business_stages = stages[businessStage].toLowerCase().split("-").join(" ");
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
    if(industryType==="0"){
      // do nothing
    }else{
      industryStr = industries[ industryType ];
      if (params.length===0){
        params = "";
      //params = "?";
      }else{
        params += "&"; 
      }
      params += "industries%5B%5D=" + industryStr;
      displayNames.industries.push(industryStr.toLowerCase().split("-").join(" "));
    }
  }

  // REGION RADIO BUTTONS
  var region = req.session.data['region']
  if(region){
    region = region;
  }
  if(region){
      if (params.length===0){
      params = "";
      //params = "?";
    }else{
      params += "&"; 
    }
    params += "regions%5B%5D=" + region.toLowerCase().split(" ").join("-");
    displayNames.regions.push(region);
  }
  
  if (params.length>0){
    facets = getFacets(params);
  }

    // then pass these to the pages to render checks and facets/chips
    res.render('summary', {
      facets:facets,
      display:displayNames,
      copy:"copy<br/>goes<br/>here...",
      params:params
    });
   

  });

  router.get('/results', function(req, res, next) {
    var params = req.session.data['params']
    var url  = "https://www.gov.uk/business-finance-support?"+ params;
    console.log("redirect to " + url);
    //res.send(url);
    // redirect to GOV.UK fund finder with filters
    res.redirect(302, url);
  
});

global.getFacets = function (arr){
  var params = arr.split("&");

  var facets = {
    types_of_support:{title:"Of Type", listOfItems:[]},
    business_stages:{title:"For Businesses Which Are", listOfItems:[]},
    industries:{title:"For Businesses In", listOfItems:[]},
    business_sizes:{title:"For Businesses With", listOfItems:[]},
    regions:{title:"For Businesses In", listOfItems:[]},
  };

  var len = params.length;
  // loop through params and split out type and values
  // will id check boxes by id eg 'id="types_of_support-finance"'
  for (var i=0;i<len;i++){
    var str = params[i];
    // catch str and url encodes 
    str = str.split("%5B%5D=").join("-");
    str = str.split("[]=").join("-");

    // build separate objects to loop through for the faceted chips
    var filters = str.split("-");
    var group = filters[0];
    // remove group name
    filters.shift();
    // recombine
    filters = filters.join("-");
    facets[group].listOfItems.push(filters);
  }

  return facets
}


router.get('/factsheet', function(req, res, next) {
 
  // then pass these to the pages to render checks and facets/chips
  res.render('factsheet', {
    results: res.app.locals.data,
    display:displayNames
  });

});



// custom filtered result page
router.get('/test', function(req, res, next) {
 
  // render a local version of the results
  var len;
  var facets;

  if(req._parsedUrl.query){
    params = req._parsedUrl.query.split("&");
    len = params.length;
    facets = getFacets(params);
  }

  var checks = {};

  // loop through params and split out type and values
  // will id check boxes by id eg 'id="types_of_support-finance"'
  for (var i=0;i<len;i++){
    var str = params[i];
    // catch str and url encodes 
    str = str.split("%5B%5D=").join("-");
    str = str.split("[]=").join("-");
     // populate a checks var to pre-tick checkboxes
    checks[str] = true;
  }


  // then pass these to the pages to render checks and facets/chips
  res.render('results', {
    results: sampleResults,
    checks: checks,
    facets:facets
  });
 
});


router.get('/postcode', function(req, res, next) {

  //console.log(req.query)
  //console.log(req.query.postcode)


/*   if(req._parsedUrl.query){
    params = req._parsedUrl.query.split("&");
    len = params.length;
    facets = getFacets(params);
  } */

  if(req.query.postcode){
    var str = req.query.postcode;
    var cleaned = str.split('%20').join('');
    cleaned = cleaned.split(' ').join('');
    //console.log("GOT CODE " + cleaned)

    //https://mapit.mysociety.org/postcode/SW1A1AA


    request(MYSOCIETY_API_URL + cleaned, {
      method: "GET",
      headers: {
          //'Authorization': process.env.EPC_API_KEY,
          'Accept': 'application/json'
        }
      }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            if(body) {
              dataset = JSON.parse(body);
              console.log(dataset);

              res.send(dataset);
/* 
              // sort by second property then first property
              // sort by house number as main order then flat number
              var sortedArray = _.chain(dataset.rows)
                .sortBy('address1')
                .sortBy('address2')
                .value();

              // loop through results and build a simple array
              var arr = [];
              for (var i=0;i<sortedArray.length;i++){
                arr[i] = {
                      "reference": sortedArray[i]['certificate-hash'],
                      "type": sortedArray[i]['property-type'],
                      "address": sortedArray[i].address +', '+ dataset.rows[i].postcode,
                      "category": sortedArray[i]['current-energy-rating']
                  }
              }

              res.render('find-a-report/results', {
                addresses: arr
              });
 */
            } else {
              /* 
              res.render('find-a-report/results', {
                addresses: []
              });
 */
            }
          } else {
            res.send('error');
            //res.redirect('/error');
          }
      });
 
  }else{
    res.send('no data');

  }
});



module.exports = router
