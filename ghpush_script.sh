python3 py/collect_clean_data.py
[[ ! -z "$1" ]] && echo $1,,,,,,,,,,,,,,,, >> covid19-data.csv
python3 py/collect_state_data.py
git add . -A 
git commit -m "Update data"
git checkout gh-pages
git checkout housekeeping covid19-data.csv
git checkout housekeeping covid19-india.json
git add . -A
git commit -m "Update data"
git push origin gh-pages
git checkout housekeeping
