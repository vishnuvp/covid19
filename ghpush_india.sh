python3 py/collect_state_data.py
git add . -A 
git commit -m "Update data"
git checkout gh-pages
git checkout housekeeping covid19-india.json
git add . -A
git commit -m "Update data"
git push origin gh-pages
git checkout housekeeping
