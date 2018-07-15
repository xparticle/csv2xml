npm install
reads from file.csv and writes to file.xml
number_columns_to_segregate array dictates which column indexes should be written to a numbers xml segment, everything else gets written to record segment.
each line from the csv is written to a single record segment.
CSV column headers are used as xml tags.
No safety checks, this is not a generic program that runs for any csv to any xml, just a specific POC.
