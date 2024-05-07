#!/bin/bash
#Exporting creds for aws user
export AWS_ACCESS_KEY_ID=AKIA2UC3A5DORXFO2Z2S
export AWS_SECRET_ACCESS_KEY=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
#Creating db backup SQL file and media folder
docker exec -i -u postgres postgres-db /bin/bash -c "pg_dump --username postgres -Fc django > /var/lib/postgresql/dump.sql"
docker cp postgres-db:/var/lib/postgresql/dump.sql /root/
zip -r /root/media.zip /root/School_feeding_last/school_feeding/media
#Uploading files to sfcwagency bucket
aws s3 cp "/root/media.zip" s3://sfcwagency/
aws s3 cp "/root/dump.sql" s3://sfcwagency/
