INSERT INTO developers (username, email, password)
VALUES ($1,$2,$3)
returning *;