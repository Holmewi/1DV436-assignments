var userId = 'me';
var locationLabel = 'Location/';
var messageArray = [];

/**
* Load Gmail API client library. List labels once client library
* is loaded.
*/
function loadGmailApi() {
  
  //gapi.client.load('gmail', 'v1', listLabels);
  gapi.client.load('gmail', 'v1', getLabel);
}

function getLabel() {


  var request = gapi.client.gmail.users.labels.list({
    'userId': userId
  });

  request.execute(function(resp) {
    var labels = resp.labels;

    for(var i = 0; i < resp.labels.length; i++) {
      if(resp.labels[i].name == locationLabel) {
        //console.log(resp.labels[i].name);
        getMessagesFromLabel(resp.labels[i], resp);
      }
    }
  });
}

function getMessagesFromLabel(label, callback) {
  var request = gapi.client.gmail.users.messages.list({'userId': userId, 'labelIds': label.id});

  request.execute(function(callback){
    var messages = callback.messages;
    //console.log(messages);
    if(messages != null) {
    
      for (var i = 0; i < messages.length; i++) {
        //console.log(messages[i].snippet);
        getMessage(messages[i].id, callback);
      }
    }
  });
    
}

/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */
function getMessage(messageId, callback) {
  var request = gapi.client.gmail.users.messages.get({
    'userId': userId,
    'id': messageId
  });
  request.execute(function(callback){
    console.log(callback);
    var ip = getFirstIPCall(callback.payload.headers);
    console.log(ip);
      //messageArray.push();
  });
}

/**
* Get the ip "Recieved" from the first call
* @param  {Array} headers
*/
function getFirstIPCall(headers) {
  //console.log(headers);
  for (var i = headers.length; i > 0; i--) {
    //console.log(headers[i]);
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
* Print all Labels in the authorized user's inbox. If no labels
* are found an appropriate message is printed.
*/
function listLabels() {
  var request = gapi.client.gmail.users.labels.list({
    'userId': userId
  });

  request.execute(function(resp) {
    var labels = resp.labels;
    appendPre('Labels:');

    if (labels && labels.length > 0) {
      for (i = 0; i < labels.length; i++) {
        var label = labels[i];
        appendPre(label.name)
      }
    } else {
      appendPre('No Labels found.');
    }
  });
}

/**
* Append a pre element to the body containing the given message
* as its text node.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}