for arg in "$@"
do
    case $arg in
        -w|--world)
		git checkout housekeeping
        python3 py/collect_clean_data.py
        git add . -A 
		git commit -m "Update data"
		git checkout gh-pages
		git checkout housekeeping covid19-data.csv
		git add . -A
		git commit -m "Update data"
        shift 
        ;;
        -i|--india)
		git checkout housekeeping
        python3 py/collect_state_data.py
        git add . -A 
		git commit -m "Update data"
		git checkout gh-pages
		git checkout housekeeping covid19-india.json
		git add . -A
		git commit -m "Update data"
        shift 
        ;;
        -g|--git-alone)
		git checkout housekeeping
		git add . -A 
		git commit -m "Update data"
		git checkout gh-pages
		git checkout housekeeping covid19-india.json
		git checkout housekeeping covid19-data.csv
		git add . -A
		git commit -m "Update data"
		;;
        -a|--all)
        python3 py/collect_clean_data.py
        python3 py/collect_state_data.py

        shift 
        ;;
        -u|--update-world)
		echo $2
        # echo $2,,,,,,,,,,,,,,,, >> covid19-data.csv

        shift # Remove argument name from processing
        shift # Remove argument value from processing
        ;;
        *)
        OTHER_ARGUMENTS+=("$1")
        shift # Remove generic argument from processing
        ;;
    esac
done

git push origin gh-pages
git checkout housekeeping
