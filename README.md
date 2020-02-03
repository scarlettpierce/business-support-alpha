# Business Support Alpha Prototype

## Installation
This app is build using v9.4.0 of the [GDS Prototype kit](https://govuk-prototype-kit.herokuapp.com/docs/install).
The standard [installation instructions](https://govuk-prototype-kit.herokuapp.com/docs/install/introduction) have been used.

tldr: clone the repo,  `npm i` then `npm start`

All pages are in the `views` folder.

The `routes.js` file is used to handle data from the forms before redirecting to the existing [Grow your Business](https://www.gov.uk/growing-your-business) pages on GOV.UK

## Notes
As the prototype is a sub-folder of the main repo, the heroku deployment is slightly different from the GDS example:
`git subtree push --prefix prototype heroku master`