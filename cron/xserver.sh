#!/usr/bin/env zsh
echo ""
echo "***************************************************"
echo "*                                                 *"
echo "*         xserver backup code running...          *"
echo "*                                                 *"
echo "***************************************************"

#TODO: put the backdoor.sh in right location
echo "call backdoor"
ssh -t -t master@bd.yangcong345.com '/bin/bash /Backup/koalaDailyEventsBackup/backdoor.sh' && \

#TODO: change to right WORK_DIR
echo "callback to Xserver"
WORK_DIR=/home/master/yangcongDatabase/koalaDailyEvents/
BACKUP_DATE="`date`"
echo "Backup date: "$BACKUP_DATE

TODAYYEAR=(`date -d -1day '+%Y'`)
TODAYMONTH=(`date -d -1day '+%m'`)
TODAYDAY=(`date -d -1day '+%d'`)

#TODO: change to right hostname and right 7z file location
cd $WORK_DIR && \
scp master@bd.yangcong345.com:/Backup/koalaDailyEventsBackup/$TODAYYEAR$TODAYMONTH$TODAYDAY.7z ./ && \

echo "start to 7za x" && \
7za x $TODAYYEAR$TODAYMONTH$TODAYDAY.7z && \
echo "already 7za x" && \

#TODO: change right db/collection/bson file name
echo "mongorestore" && \
mongorestore --db dailyEvents --collection events ./koala/yesterdayEvents.bson

rm -rf ./koala
echo "already clean dump file"
echo "code done"
