#!/usr/bin/env zsh
#TODO: create right log file
LOGFILE=/tmp/koalaDailyBackupEvents.log

echo "" >> $LOGFILE && \
echo "*************************************" >> $LOGFILE && \
echo "*                                   *" >> $LOGFILE && \
echo "*         work on backdoor          *" >> $LOGFILE && \
echo "*                                   *" >> $LOGFILE && \
echo "*************************************" >> $LOGFILE && \

BACKUP_DATE="`date`" && \
echo "1. Backup date: "$BACKUP_DATE >> $LOGFILE && \

#TODO: change to right WORK_DIR dbhostname dbname
WORK_DIR=/Backup/koalaDailyEventsBackup/ && \
cd $WORK_DIR && \
DBHOSTNAME="mongo-t1" && \
DB_NAME="koala" && \

YEAR=(`date -d -1day '+%Y'`) && \
MONTH=(`date -d -1day '+%m'`) && \
DAY=(`date -d -1day '+%d'`) && \

#TODO: this command need to run in mongo server
echo "2. rename yesterday database" >> $LOGFILE && \
echo "db.events.renameCollection('db$YEAR$MONTH$DAY')" > "mongoRename"$MONTH$DAY.js && \
mongo $DB_NAME "mongoRename"$MONTH$DAY.js && \
echo "3. already rename yesterday database as " $YEAR$MONTH$DAY >> $LOGFILE && \

#TODO: change to right mongo host collction name
echo "4. ready to dump" >> $LOGFILE && \
time mongodump --host $DBHOSTNAME --db $DB_NAME --collection "db"$YEAR$MONTH$DAY && \
echo "5. already dump" >> $LOGFILE && \

echo "6. start to 7za a" >> $LOGFILE && \
7za a $YEAR$MONTH$DAY.7z ./dump/* && \
echo "7. already 7za a "$YEAR$MONTH$DAY.7z >> $LOGFILE && \

rm -rf ./dump && \
echo "8. remove dump folder" >> $LOGFILE && \

echo "9. backdoor koala backup code done" >> $LOGFILE && \
echo "" >> $LOGFILE

df -h > $LOGFILE
