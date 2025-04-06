function doGet() {
  var template = HtmlService.createTemplateFromFile('index');
  return template.evaluate(); // .setSandboxMode() is deprecated
}

function importDataFromCSV(form) {
  var file = form.uploadedFile;
  var filename = file.getName();
  var mimeType = file.getContentType();

  // Only allow CSV for simplicity
  if (mimeType !== 'text/csv' && mimeType !== 'application/vnd.ms-excel') {
    return { success: false, message: 'Only CSV files are allowed.' };
  }

  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  var headers = csvData[0];
  var data = csvData.slice(1);
  var errors = [];

  // Define validation rules
  var rules = {
    "Name": ["notEmpty"],
    "Age": ["notEmpty", "numeric"],
    "Gender": ["Male", "Female", "Other"]
  };

  // Check required columns
  var requiredColumns = Object.keys(rules);
  var missingColumns = requiredColumns.filter(function(column) {
    return headers.indexOf(column) === -1;
  });
  if (missingColumns.length > 0) {
    return { success: false, message: `Missing required columns: ${missingColumns.join(", ")}` };
  }

  // Validate each row
  data.forEach(function(row, rowIndex) {
    var rowNumber = rowIndex + 2;
    var rowErrors = [];

    headers.forEach(function(header, colIndex) {
      var value = row[colIndex];
      var rule = rules[header];
      if (rule && Array.isArray(rule)) {
        if (rule.includes("notEmpty") && (!value || value.trim() === "")) {
          rowErrors.push(`${header} cannot be empty`);
        }
        if (rule.includes("numeric") && value && isNaN(value)) {
          rowErrors.push(`${header} must be numeric`);
        }
        if (!["notEmpty", "numeric"].some(r => rule.includes(r)) && !rule.includes(value)) {
          rowErrors.push(`${header} must be one of: ${rule.join(", ")}`);
        }
      }
    });

    if (rowErrors.length > 0) {
      errors.push(`Row ${rowNumber}: ${rowErrors.join("; ")}`);
    }
  });

  if (errors.length > 0) {
    return { success: false, message: errors.join("<br>") };
  }

  // Write to Sheet
  var sheet = SpreadsheetApp.openById('1Qtw3O27ry_O_eyQDivn2gkiVrKmpFZOK-Vl9Nv5qdRc').insertSheet("Imported Data");
  sheet.appendRow(headers);
  data.forEach(row => sheet.appendRow(row));

  return { success: true, message: "Data imported successfully!" };
}
