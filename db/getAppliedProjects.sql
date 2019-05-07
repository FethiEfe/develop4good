SELECT * FROM apply_project
JOIN charities ON apply_project.char_id = charities.char_id 
JOIN project_for_good ON project_for_good.project_id = apply_project.project_id
WHERE dev_id = $1
