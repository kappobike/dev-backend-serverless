'use strict';

module.exports.triggerStream = (event, context, callback) => {
  console.log('trigger stream was called');

  
  //En terminal se pueden capturar los eventos 
  //con este código: serverless logs -f triggerStream -t
  //más lo que sigue a continuación
  const eventData = event.Records[0];
  console.log(eventData);

  console.log(eventData.dynamodb.Keys);
  callback(null, null);
  

};