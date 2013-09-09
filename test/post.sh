#!/bin/bash
SUBJECT="555-0833"
MESSAGE="test 123 post"
TODAY=$(date +%s)
#echo "Today is" $MESSAGE
USER="fhefv4d"
RANDOMID=`LC_ALL=C tr -dc '0123456789abcdefghijklmnopqrstuvwxyz' < /dev/urandom | head -c 7 | xargs`
ID="incident/"$RANDOMID
echo $ID
#     cat /dev/random tr -dc '[:alnum:]' | head -c8
# </dev/urandom tr -dc '0123456789abcdefghijklmnopqrstuvwxyz' | head -c8; echo ""
# LC_ALL=C tr -dc '0123456789abcdefghijklmnopqrstuvwxyz' < /dev/urandom | head -c 7 | xargs
JSON="{\"_id\":\"$ID\",\"flowId\":\"300\",\"formId\":\"incident\",\"phone\":\"$SUBJECT\",\"description\":\"$MESSAGE\",\"subcounty\":\"3\",\"village\":\"122\",\"priority\":\"3\",\"department\":\"1\",\"created\":$TODAY,\"lastModified\":$TODAY,\"createdBy\":\"$USER\",\"type\":\"incident\"}"
#JSON="{"flowId":"300","formId":"incident","phone":"$SUBJECT","description":"$MESSAGE","created":$TODAY,"lastModified":$TODAY,"createdBy":"$USER","type":"incident"}"
#JSON="{\"flowId":\"300\",\"formId\":\"incident\",\"phone\":\"555-5555\"}"
echo $JSON
# curl -X POST http://user%2Fdis:dis@192.168.1.60:6006/user%2Ffhefv4d -d "$JSON" -H"Content-Type: application/json"
curl -X POST http://testuser:testuserPassword@olutindo.iriscouch.com/troubletickets -d "$JSON" -H"Content-Type: application/json"
