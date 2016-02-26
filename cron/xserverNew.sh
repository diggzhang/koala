#!/usr/bin/env zsh

LOGFILE=/tmp/xserverBackupKoalaEvents.log

echo "" >> $LOGFILE && \
echo "***************************************************" >> $LOGFILE && \
echo "*                                                 *" >> $LOGFILE && \
echo "*         xserver backup code running...          *" >> $LOGFILE && \
echo "*                                                 *" >> $LOGFILE && \
echo "***************************************************" >> $LOGFILE && \

BACKUP_DATE="`date`" && \
echo "1. Backup date: "$BACKUP_DATE >> $LOGFILE && \

#TODO: put the backdoor.sh in right location
echo "2. ssh to backdoor `date`" >> $LOGFILE && \
ssh -t -t master@bd.yangcong345.com '/bin/bash /Backup/koalaDailyEventsBackup/backdoor.sh' && \
echo "3. back to xserver `date`" >> $LOGFILE && \

TODAYYEAR=(`date -d -1day '+%Y'`) && \
TODAYMONTH=(`date -d -1day '+%m'`) && \
TODAYDAY=(`date -d -1day '+%d'`) && \

#TODO: change to right hostname and right 7z file location
#TODO: change to right WORK_DIR
WORK_DIR=/home/master/yangcongDatabase/koalaDailyEvents/ && \
cd $WORK_DIR && \
echo "4. start to scp today 7z file" >> $LOGFILE && \
scp master@bd.yangcong345.com:/Backup/koalaDailyEventsBackup/$TODAYYEAR$TODAYMONTH$TODAYDAY.7z ./ && \
echo "5. start to scp today 7z file" >> $LOGFILE && \

echo "6. start to unarchive 7z file" >> $LOGFILE && \
7za x $TODAYYEAR$TODAYMONTH$TODAYDAY.7z && \
echo "7. already unarchive 7z file" >> $LOGFILE && \

#TODO: change right db/collection/bson file name
echo "8. start to mongorestore" >> $LOGFILE && \
mongorestore --db dailyEvents --collection events ./koala/"db"$TODAYYEAR$TODAYMONTH$TODAYDAY.bson && \
echo "9. already restore mongo bson" >> $LOGFILE && \

rm -rf ./koala && \
echo "10. already clean dump file" >> $LOGFILE && \
echo "11. code done" >> $LOGFILE && \

df -h >> $LOGFILE
