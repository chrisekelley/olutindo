var bySearchKeywords = function(doc) {
  if(doc.phone) {
    emit(doc.phone, doc);
  }
}

var byDepartment = function(doc) {
  if(doc.department) {
    console.log("department: " + doc.department)
    emit(doc.department, doc);
  }
}