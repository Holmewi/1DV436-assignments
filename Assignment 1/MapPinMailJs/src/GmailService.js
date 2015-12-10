var userId = 'me';
var locationLabel = 'Location/';
var messageArray = [];

/**
*   Method is called from the Quickstart.js
*   Load Gmail API client library. List labels once client library is loaded.
*/
function loadGmailApi() {
  gapi.client.load('gmail', 'v1', getLabel);
}

/**
*   List labels from the Gmail API and loop throught them to find the locationLabel
*   Send the sublabels to a method
*/
function getLabel() {
  var request = gapi.client.gmail.users.labels.list({
    'userId': userId
  });

  request.execute(function(resp) {
    var labels = resp.labels;

    for(var i = 0; i < resp.labels.length; i++) {
      if(resp.labels[i].name.indexOf(locationLabel) != -1) {
        getMessagesFromLabel(resp.labels[i], resp);
      }
    }
  });
}

/**
*   List all the messages with the label ID
*   @param {Object} label, a child label to the locationLabel
*   @param {Function} callback Function to call when the request is complete.
*   Send the sublabels to a method
*/
function getMessagesFromLabel(label, callback) {
  var request = gapi.client.gmail.users.messages.list({'userId': userId, 'labelIds': label.id});

  request.execute(function(callback){
    var messages = callback.messages;
    if(messages != null) {
      for (var i = 0; i < messages.length; i++) {
        var location = getLocationFromLabel(label.name);
        compileMessageToArray(messages[i].id, callback, location);
      }
    }
  });
}

/**
 *   Get Message with given ID.
 *
 *   can be used to indicate the authenticated user.
 *   @param  {String} messageId ID of Message to get.
 *   @param  {Function} callback Function to call when the request is complete.
  *  @param  {String} location of the message.
 */
function compileMessageToArray(messageId, callback, location) {
  var request = gapi.client.gmail.users.messages.get({
    'userId': userId,
    'id': messageId
  });
  request.execute(function(callback){

    var message = {location : location, 
                    snippet : callback.snippet, 
                    date : callback.payload.headers[14].value, 
                    from : callback.payload.headers[17].value};
    getGeocode(message);
    messageArray.push(message);
  });
}

/**
*   Replace the path name to save the location as string
*   @param {String} labelName contains the label path
*/
function getLocationFromLabel(labelName) {
  var location = labelName.replace(locationLabel, "");
  return location;
}

/**
* Get the ip "Recieved" from the first call
* @param  {Array} headers
* This function is not in use at the moment
*/
function getFirstIPCall(headers) {
  for (var i = headers.length; i > 0; i--) {

    for(var data in headers[i]) {

      if(headers[i].name === "Received") {
        var re = /\[([0-9]{1,3}[\.]){3}[0-9]{1,3}\]/g;
        var reg = /[^[\]]+([0-9]{1,3}[\.]){3}[0-9]{1,3}(?=])/g;
        var value = headers[i].value;
        var valuetemp = "dsf sdfs fsf [192.123.0.1] dfdf fd";
        var bracket1 = "[";
        var bracket1 = "]";

        if(value.match(reg)) {
          return value.match(reg);
        }
      }   
    }
  }
}

/**
*   Append a pre element to the body containing the given message
*   as its text node.
*
*   @param {string} message Text to be placed in pre element.
*   This method was used for testing
*/
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}