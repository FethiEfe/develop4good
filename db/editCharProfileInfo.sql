UPDATE charities 
SET nameoforganization =$2, website=$3, email=$4, charlinkedin=$5, mission=$6
WHERE char_id = $1;

SELECT * FROM charities WHERE char_id = $1