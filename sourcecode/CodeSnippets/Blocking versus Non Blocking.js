

//blocking
var result = database.query("SELECT * FROM hugetable");
console.log("Hello World");

//non blocking

database.query("SELECT * FROM hugetable", function(rows) {
  var result = rows;
});

console.log("Hello World");