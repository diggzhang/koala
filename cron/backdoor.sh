#!/usr/bin/env zsh
echo "" >> /tmp/koaladailybackup.log
echo "*************************************" >> /tmp/koaladailybackup.log
echo "*                                   *" >> /tmp/koaladailybackup.log
echo "*         work on backdoor          *" >> /tmp/koaladailybackup.log
echo "*                                   *" >> /tmp/koaladailybackup.log
echo "*************************************" >> /tmp/koaladailybackup.log

WORK_DIR=/Backup/koalaDailyEventsBackup/
DBHOSTNAME="mongo-t1"
DB_NAME="koala"
BACKUP_DATE="`date`"
echo "Backup date: "$BACKUP_DATE >> /tmp/koaladailybackup.log

YEAR=(`date -d -1day '+%Y'`)
MONTH=(`date -d -1day '+%m'`)
DAY=(`date -d -1day '+%d'`)

echo "backup date"$YEAR $MONTH $DAY >> /tmp/koaladailybackup.log

#TODO: this command need to run in mongo server
echo "rename yesterday database" >> /tmp/koaladailybackup.log
mongo $DB_NAME --eval "db.events.renameCollection('yesterdayEvents')"

cd $WORK_DIR && \

echo "ready to dump" >> /tmp/koaladailybackup.log
time mongodump --host $DBHOSTNAME --db $DB_NAME --collection yesterdayEvents
echo "already dump" >> /tmp/koaladailybackup.log

echo "start to 7za a" >> /tmp/koaladailybackup.log
7za a $YEAR$MONTH$DAY.7z ./dump/*
echo "already 7za a "$YEAR$MONTH$DAY.7z >> /tmp/koaladailybackup.log

rm -rf ./dump
echo "remove dump folder" >> /tmp/koaladailybackup.log

echo "backdoor koala backup code done" >> /tmp/koaladailybackup.log
echo "" >> /tmp/koaladailybackup.log
