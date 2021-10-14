const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const values = [process.argv[2]];

pool.query(`SELECT 
teachers.name as teacher,
cohorts.name as cohort,
COUNT(assistance_requests.*) as total_assistances
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
GROUP BY teacher, cohort
ORDER BY teacher;`, values)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
  pool.end();
})
.catch(err => console.error('query error', err.stack));