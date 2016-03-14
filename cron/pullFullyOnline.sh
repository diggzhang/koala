for i in {20160301..20160313}
do
    DBNAME="db"$i
    echo $DBNAME 
    echo "mongodump this day"
    mongodump --host mongoTrack --db koala --collection $DBNAME

    echo "7za today"
    7za a $DBNAME.7z ./dump/

    echo "remove today"
    rm -rf ./dump
done
