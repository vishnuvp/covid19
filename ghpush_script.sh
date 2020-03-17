python3 py/collect_clean_data.py
[[ ! -z "$1" ]] && echo $1,,,,,,,,,,,,,,,, > covid19-data.csv
git add . -A 
git commit -m "Update data"
git checkout gh-pages
git checkout master covid19-data.csv
git add . -A
git commit -m "Update data"
git push origin gh-pages
git checkout master
