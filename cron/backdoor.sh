echo ""
echo "---------- workon backdoor ----------"
WORK_DIR=/Backup/dailyBackupDB/
HOSTNAME="koala"
DB_NAME="onionsEvents"
BACKUP_DATE="`date`"
echo "Backup date: "$BACKUP_DATE

# convert to millonseconds use for mongo query
YEAR=(`date -d -1day '+%Y'`)
MONTH=(`date -d -1day '+%m'`)
DAY=(`date -d -1day '+%d'`)
echo "backup date great than " $YEAR $MONTH $DAY " && \

cd $WORK_DIR && \

echo "ready to dump"
time ./mongodump --host $HOSTNAME --db $DB_NAME --collection events
time ./mongodump --host $HOSTNAME --db $DB_NAME --collection test
echo "already dump"

echo "start to 7za a"
7za a $YEAR$MONTH$DAY.7z ./dump/*
echo "already 7za a $YEAR$MONTH$DAY.7z

rm -rf ./dump
echo "remove dump folder"

echo "drop this day database"
mongo $DB_NAME --eval "db.dropDatabase()"

echo "code done"
echo "---------- workon backdoor ----------"
echo ""
