  //En terminal se pueden capturar los eventos 
  //con este código: serverless logs -f triggerStream -t

'use strict';
const { createApolloFetch } = require('apollo-fetch');

const SM_GRAPHQL_API = process.env.SM_GRAPHQL_API;

const apolloFetch = createApolloFetch({ uri: SM_GRAPHQL_API });

apolloFetch.use(({ request, options }, next) => {
  options.headers = {
    "Content-Type": "application/json",
    "X-Api-Key": process.env.API_KEY //"da2-r5zx7mlnqnhhzlarhdr6qtbkju"
  };
  next();
});

module.exports.triggerStream = (event, context, callback) => {
  console.log('trigger stream was called');
  const eventData = event.Records[0];
  var key = eventData.dynamodb.Keys.id.S;
  var eventName = eventData.eventName;

 //console.log(eventData);
 //console.log(eventData.dynamodb.Keys);

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

const fetchUserData = () =>
apolloFetch({
  query: getTrip,
  variables: { id: key }
}).catch(error => {
  console.log(error);
});

fetchUserData().then(response => {
  
  //console.log(response)
  console.log('ID Usuario Trip: ' + response.data.getTrip.user.id)
  var user = response.data.getTrip.user.id
  
});
callback(null, null);
//callback(null, { message: 'Dynamodb Event: ' + eventName + '. Key: '+ key + '!', event });
};