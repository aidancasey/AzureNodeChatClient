var azure = require('azure');

//to generate GUIDs
var uuid = require('node-uuid');

function LogEntry(msg,who)
{
var tableService = azure.createTableService();
var tableName = 'chatroomMessages';

tableService.createTableIfNotExists('chatroomMessages', function(error){
    if(!error){
        // Table exists
    }
});


var tableService = azure.createTableService(),
    task1 = {
        PartitionKey : 'messages',
        RowKey: uuid.v1() ,
        Message: msg,
        Nickname :who
    };
tableService.insertEntity('chatroomMessages', task1, function(error){ 
    if(!error){
        // Entity inserted
    }
});

}

exports.LogEntry = LogEntry;

