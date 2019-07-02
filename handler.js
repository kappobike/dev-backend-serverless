'use strict';
const { createApolloFetch } = require('apollo-fetch');

const SM_GRAPHQL_API = "https://id4zbk5cyjhnpajlifbea5yyti.appsync-api.us-east-1.amazonaws.com/graphql";

const apolloFetch = createApolloFetch({ uri: SM_GRAPHQL_API });

apolloFetch.use(({ request, options }, next) => {
  options.headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "da2-m2s6cxl4kvco7mxnzz2vexum5m"
  };
  next();
});

module.exports.triggerStream = (event, context, callback) => {
  console.log('trigger stream was called');
  const eventData = event.Records[0];
  /*
  //En terminal se pueden capturar los eventos 
  //con este código: serverless logs -f triggerStream -t
  //más lo que sigue a continuación:
  
  console.log(eventData);

  console.log(eventData.dynamodb.Keys);
  callback(null, null);
  */
 var key = eventData.dynamodb.Keys.id.S;//event.Records[0].dynamodb.Keys.id;
 var eventName = eventData.eventName;
 //callback(null, { message: 'Dynamodb Event: ' + eventName + '. Key: '+ key + '!', event });

 console.log(eventData);

 console.log(eventData.dynamodb.Keys);

 console.log('Dynamodb Event: ' + eventName + '. Key: '+ key);

 const getTrip = `
 query getTrip($id: ID!) {
  getTrip(id: $id) {
    user {
      id
    }
    time_seconds
  }
}
`;

const fetchData = () =>
apolloFetch({
  query: getTrip,
  variables: { id: key }
}).catch(error => {
  console.log(error);
});

fetchData().then(response => {
  
  console.log(response)
  console.log(response.data.getTrip.user.id)
});
callback(null, null);
};