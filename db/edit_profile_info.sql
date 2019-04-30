UPDATE developers 
SET first_name =$2, last_name=$3, email=$4, linkedin=$5, skills=$6
WHERE id = $1;

SELECT * FROM developers WHERE id = $1