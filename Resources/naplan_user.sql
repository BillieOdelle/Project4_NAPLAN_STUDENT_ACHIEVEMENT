SELECT * FROM naplan_results_clean

SELECT subgroup FROM Naplan_results_clean

GRANT pg_read_all_data, pg_write_all_data TO naplan_user;

COMMENT ON ROLE naplan_user IS 'password is password';