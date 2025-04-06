# 📊 Google Apps Script – CSV Import & Data Validator

A simple yet powerful Google Apps Script web app that allows users to upload CSV files, validates the data based on defined rules, and imports the clean data into a Google Sheet.

Perfect for teams that need quick validations before pushing messy data into your precious spreadsheets. 🚀

---

## 🧰 Features

- ✅ Upload `.csv` files via a custom HTML form
- ✅ Auto-validates data for:
  - Required fields
  - Empty values
  - Numeric-only fields
  - Predefined allowed values
- 📥 Clean data gets imported into a new sheet
- ⚠️ Errors are returned row-wise with column-level messages

## 🛠️ How to Use

1. **Clone or Copy the Code** into a new [Google Apps Script project](https://script.google.com).
2. Replace the placeholder Spreadsheet ID:
   ```javascript
   SpreadsheetApp.openById('PASTE-YOUR-SHEET-ID-HERE')

Create an index.html file and paste the frontend code inside.

Go to Deploy > Test deployments or Deploy as Web App:

Execute as: Me

Access: Anyone with the link

Open the deployed link and upload your .csv file.

🔍 Example Validation Rules

var rules = {
  "Name": ["notEmpty"],
  "Age": ["notEmpty", "numeric"],
  "Gender": ["Male", "Female", "Other"]
};

🚫 Limitations
Only supports .csv files for now

Doesn’t yet support .xlsx or column mapping

File size is subject to Google Apps Script limits (~50MB)

Won’t fix your data for you... just judges it

it

📦 Possible Improvements
 Add support for Excel files (.xlsx)

 Allow UI-based column mapping

 Sheet deduplication & versioning

 Modern UI with status/progress bar

 Notification after import

🧠 Behind the Scenes
doGet() renders the form UI

importDataFromCSV() handles file validation and import

Utilities.parseCsv() reads the file content

Valid rows go into a new sheet, errors are returned to the user

