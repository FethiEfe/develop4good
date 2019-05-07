SELECT * FROM apply_project
JOIN developers ON apply_project.dev_id = developers.id
WHERE project_id = $1
