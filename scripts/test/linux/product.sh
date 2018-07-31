#!/bin/bash
echo "stop SpringBoot Application"
pid=`ps -ef | grep product-0.0.1-SNAPSHOT.jar | grep -v grep | awk '{print $2}'`
if [ -n "$pid" ]
then
kill -9 $pid
fi

export JAVA_HOME=/usr/java/jdk1.8.0_17
chmod 777 /opt/exec/product/product-0.0.1-SNAPSHOT.jar
cd /opt/exec/product/
nohup java -jar product-0.0.1-SNAPSHOT.jar > temp.txt 2>&1 &
echo "start successfully"
