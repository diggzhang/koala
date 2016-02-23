#!/usr/bin/env zsh
echo "---------------------------------------------------"
echo "xserver backup code running..."
echo "---------------------------------------------------"

echo "call backdoor"
ssh master@bd.yangcong345.com 'bash -s' < backdoor.sh && \

echo "callback to Xserver"
WORK_DIR=/home/master/yangcongDatabase/dailyEventsBackup/
BACKUP_DATE="`date`"
echo "Backup date: "$BACKUP_DATE

TODAYYEAR=(`date -d -1day '+%Y'`)
TODAYMONTH=(`date -d -1day '+%m'`)
TODAYDAY=(`date -d -1ay '+%d'`)

cd $WORK_DIR && \
scp master@bd.yangcong345.com:/Backup/incrementdb/$TODAYYEAR$TODAYMONTH$TODAYDAY.7z ./ && \

echo "start to 7za x" && \
7za x $TODAYYEAR$TODAYMONTH$TODAYDAY.7z && \
echo "already 7za x" && \

echo "mongorestore" && \
mongorestore --db onionsEventsDailyBackup --collection events ./onions/events.bson

rm -rf ./onions
echo "already clean dump file"
echo "code done"
