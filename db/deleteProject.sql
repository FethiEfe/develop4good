DELETE FROM apply_project WHERE project_id = $1;
DELETE FROM project_for_good WHERE project_id = $1;
