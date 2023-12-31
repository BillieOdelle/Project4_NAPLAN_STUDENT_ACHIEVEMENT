-- drop tables if exists
drop table if exists naplan_results_clean;

CREATE TABLE naplan(
CALENDAR_YEAR INT,
YEAR_LEVEL INT,
DOMAIN VARCHAR,
STATE VARCHAR,
SUBGROUP VARCHAR,
ENROLLED_STUDENTS INT,
MEAN FLOAT,
MEAN_CI FLOAT,
MEAN_SD DOUBLE PRECISION,
NMS FLOAT,
NMS_CI FLOAT,
GAIN FLOAT,
GAIN_CI FLOAT,
EXPEMPT FLOAT,
ABSENT FLOAT,
ASSESSED FLOAT,
WITHDRAWN FLOAT,
NONATTEMPT FLOAT,
PARTICIPATION_RATE FLOAT,
PARTICIPATION_NUMBER INT,
NOT_STATED FLOAT,
AVERAGE_AGE VARCHAR,
YEARS_OF_SCHOOLING VARCHAR,
BANDCOL1 FLOAT,
BANDCOL2 FLOAT,
BANDCOL3 FLOAT,
BANDCOL4 FLOAT,
BANDCOL5 FLOAT,
BANDCOL6 FLOAT,
PCTL05 FLOAT,
PCTL20 FLOAT,
PCTL80 FLOAT,
PCTL95 FLOAT,
NOD_MEAN_PREV VARCHAR,
NOD_NMS_PREV VARCHAR,
NOD_MEAN_BASE VARCHAR,
NOD_NMS_BASE VARCHAR
);

SELECT * FROM naplan_results_clean

