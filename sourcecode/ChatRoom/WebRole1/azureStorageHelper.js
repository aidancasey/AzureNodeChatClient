var azure = require('azure');

//to generate GUIDs
var uuid = require('node-uuid');

function LogEntry()
{
var tableService = azure.createTableService();
var tableName = 'tasktable';

tableService.createTableIfNotExists('tasktable', function(error){
    if(!error){
        // Table exists
    }
});


var tableService = azure.createTableService(),
    task1 = {
        PartitionKey : 'messages',
        RowKey: uuid.v1() ,
        Description: 'Take out the trash',
        DueDate: new Date(2011, 12, 14, 12) 
    };
tableService.insertEntity('tasktable', task1, function(error){ 
    if(!error){
        // Entity inserted
    }
});

}

exports.LogEntry = LogEntry;

