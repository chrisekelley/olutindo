var bySearchKeywords = function(doc) {
  if(doc.phone) {
    emit(doc.phone, doc);
  }
}

var byDepartmentAdmin = function(doc) {
  if(doc.dep_administration) {
    console.log("department: " + doc.dep_administration)
    emit(doc.dep_administration, doc);
  }
}

var byDepartmentCommDev = function(doc) {
  if(doc.dep_community_development) {
    emit(doc.dep_community_development, doc);
  }
}

var byDepartmentCouncil = function(doc) {
  if(doc.dev_council) {
    emit(doc.dev_council, doc);
  }
}

var byDepartmentEducation = function(doc) {
  if(doc.dev_education) {
    emit(doc.dev_education, doc);
  }
}

var byDepartmentFinance = function(doc) {
  if(doc.dev_finance) {
    emit(doc.dev_finance, doc);
  }
}

var byDepartmentHealth = function(doc) {
  if(doc.dev_health) {
    emit(doc.dev_health, doc);
  }
}

var byDepartmentNatResources = function(doc) {
  if(doc.dev_nat_resources) {
    emit(doc.dev_nat_resources, doc);
  }
}

var byDepartmentProduction = function(doc) {
  if(doc.dev_production) {
    console.log("department: " + doc.dev_production)
    emit(doc.dev_production, doc);
  }
}

var byDepartmentWorks = function(doc) {
  if(doc.dev_works) {
    console.log("department: " + doc.dev_works)
    emit(doc.dev_works, doc);
  }
}

var byDepartment = function(department) {
  console.log("byDepartment: " + department);
  if (department === '1') {
    return byDepartmentAdmin
  } else if (department === '6') {
    return byDepartmentCouncil
  } else if (department === '7') {
    return byDepartmentCommDev
  } else if (department === '3') {
    return byDepartmentEducation
  } else if (department === '2') {
    return byDepartmentFinance
  } else if (department === '4') {
    return byDepartmentHealth
  } else if (department === '8') {
    return byDepartmentNatResources
  } else if (department === '9') {
    return byDepartmentProduction
  } else if (department === '5') {
    return byDepartmentWorks
  }
}

var byParentId = function(doc) {
  if(doc.parentId) {
    emit(doc.parentId, doc);
  }
}