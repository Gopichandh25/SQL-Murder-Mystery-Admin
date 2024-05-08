const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const { Pool } = require("pg");

// let {
//   driversLicenseList,
//   facebookEventCheckinList,
//   personList,
//   getFitNowMemberList,
//   getFitNowCheckinList,
//   interviewList,
//   crimeSceneReportList,
//   incomeList,
// } = require("./seeds");

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const pool = new Pool({
  user: "gopi",
  host: "localhost",
  database: "DMQL_Project",
  password: "gopi",
  port: 5432,
});

async function connectionTest() {
  await pool.connect();
  console.log("Connected to the Database Successfully");
}

connectionTest();

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//====================================================

app.get("/driversLicense", async (req, res, next) => {
  const { rows } = await pool.query("SELECT * FROM drivers_license LIMIT 100");
  res.render("driversLicense.ejs", { driversLicenseList: rows });
});

app.post("/driversLicense", async (req, res, next) => {
  const new_driver = req.body.driver;
  try {
    await pool.query(
      "INSERT INTO drivers_license VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        new_driver.id,
        new_driver.age,
        new_driver.height,
        new_driver.eye_color,
        new_driver.hair_color,
        new_driver.gender,
        new_driver.plate_number,
        new_driver.car_make,
        new_driver.car_model,
      ]
    );
    res.redirect("/driversLicense");
  } catch (e) {
    console.error(e);
  }
});

app.get("/driversLicense/new", (req, res, next) => {
  res.render("driversLicenseNew.ejs");
});

app.get("/driversLicense/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM drivers_license WHERE id=$1",
    [id]
  );
  res.render("driver.ejs", { driver: rows[0] });
});

app.delete("/driversLicense/:id", async (req, res, next) => {
  const { id } = req.params;
  await pool.query("DELETE FROM drivers_license WHERE id=$1", [id]);
  res.redirect("/driversLicense");
});

//==================================================

app.get("/facebookEventCheckin", async (req, res, next) => {
  const { rows } = await pool.query(
    "SELECT * FROM facebook_event_checkin LIMIT 100"
  );
  res.render("facebookEventCheckin.ejs", { facebookEventCheckinList: rows });
});

app.post("/facebookEventCheckin", async (req, res, next) => {
  const new_event = req.body.event;
  try {
    await pool.query("INSERT INTO facebook_event_checkin VALUES($1,$2,$3,$4)", [
      new_event.person_id,
      new_event.event_id,
      new_event.event_name,
      new_event.date,
    ]);
    res.redirect("/facebookEventCheckin");
  } catch (e) {
    Console.error(e);
  }
});

app.get("/facebookEventCheckin/new", (req, res, next) => {
  res.render("facebookEventCheckinNew.ejs");
});

// need to do : Primary key
app.get("/facebookEventCheckin/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM facebook_event_checkin WHERE event_id=$1",
    [id]
  );
  res.render("facebookEvent.ejs", { facebookEventCheckin: rows[0] });
});

// need to do : primary key
app.delete("/facebookEventCheckin/:id", async (req, res, next) => {
  const { id } = req.params;
  await pool.query("DELETE FROM facebook_event_checkin WHERE event_id=$1", [
    id,
  ]);
  res.redirect("/facebookEventCheckin");
});

//==================================================

app.get("/person", async (req, res, next) => {
  const { rows } = await pool.query("SELECT * FROM person LIMIT 100");
  res.render("persons.ejs", { personList: rows });
});

app.post("/person", async (req, res, next) => {
  const new_person = req.body.person;
  try {
    await pool.query("INSERT INTO person VALUES($1,$2,$3,$4,$5,$6)", [
      new_person.id,
      new_person.name,
      new_person.license_id,
      new_person.address_number,
      new_person.address_street_name,
      new_person.ssn,
    ]);
    res.redirect("/person");
  } catch (e) {
    console.error(e);
  }
});

app.get("/person/new", (req, res, next) => {
  res.render("personNew.ejs");
});

app.get("/person/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FROM person WHERE id=$1", [id]);
  res.render("person.ejs", { person: rows[0] });
});

app.delete("/person/:id", async (req, res, next) => {
  const { id } = req.params;

  await pool.query("DELETE FROM person WHERE id=$1", [id]);

  res.redirect("/person");
});

//=================================================

app.get("/getFitNowMember", async (req, res, next) => {
  const { rows } = await pool.query(
    "SELECT * FROM get_fit_now_member LIMIT 100"
  );
  res.render("getFitNowMembers.ejs", { getFitNowMemberList: rows });
});

app.post("/getFitNowMember", async (req, res, next) => {
  const new_getFitNowMember = req.body.getFitNowMember;
  try {
    await pool.query("INSERT INTO get_fit_now_member VALUES($1,$2,$3,$4,$5)", [
      new_getFitNowMember.id,
      new_getFitNowMember.person_id,
      new_getFitNowMember.name,
      new_getFitNowMember.membership_start_date,
      new_getFitNowMember.membership_status,
    ]);
    res.redirect("/getFitNowMember");
  } catch (e) {
    console.error(e);
  }
});

app.get("/getFitNowMember/new", (req, res, next) => {
  res.render("getFitNowMemberNew.ejs");
});

app.get("/getFitNowMember/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM get_fit_now_member WHERE id=$1",
    [id]
  );
  res.render("getFitNowMember.ejs", { getFitNowMember: rows[0] });
});

app.delete("/getFitNowMember/:id", async (req, res, next) => {
  const { id } = req.params;
  await pool.query("DELETE FROM get_fit_now_member WHERE id=$1", [id]);
  res.redirect("/getFitNowMember");
});

//==================================================

app.get("/getFitNowCheckin", async (req, res, next) => {
  const { rows } = await pool.query(
    "SELECT * FROM get_fit_now_check_in LIMIT 100"
  );
  res.render("getFitNowCheckins.ejs", { getFitNowCheckinList: rows });
});

app.post("/getFitNowCheckin", async (req, res, next) => {
  const new_getFitNowCheckin = req.body.getFitNowCheckin;
  try {
    await pool.query("INSERT INTO get_fit_now_check_in VALUES($1,$2,$3,$4)", [
      new_getFitNowCheckin.membership_id,
      new_getFitNowCheckin.check_in_date,
      new_getFitNowCheckin.check_in_time,
      new_getFitNowCheckin.check_out_time,
    ]);
  } catch (e) {
    console.error(e);
  }
  res.redirect("/getFitNowCheckin");
});

app.get("/getFitNowCheckin/new", (req, res, next) => {
  res.render("getFitNowCheckinNew.ejs");
});

app.get("/getFitNowCheckin/:id/:date/:time", async (req, res, next) => {
  const { id, date, time } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM get_fit_now_check_in WHERE membership_id=$1 AND check_in_date=$2 AND check_in_time=$3",
    [id, date, time]
  );
  res.render("getFitNowCheckin.ejs", { getFitNowCheckin: rows[0] });
});

app.delete("/getFitNowCheckin/:id/:date/:time", async (req, res, next) => {
  const { id, date, time } = req.params;
  await pool.query(
    "DELETE FROM get_fit_now_check_in WHERE event_id=$1 AND check_in_date=$2 AND check_in_time=$3",
    [id, date, time]
  );
  res.redirect("/getFitNowCheckin");
});

//=================================================

app.get("/interview", async (req, res, next) => {
  const { rows } = await pool.query("SELECT * FROM interview LIMIT 100");
  res.render("interviews.ejs", { interviewList: rows });
});

app.post("/interview", async (req, res, next) => {
  const new_interview = req.body.interview;
  try {
    await pool.query("INSERT INTO interview VALUES($1,$2)", [
      new_interview.person_id,
      new_interview.transcript,
    ]);
  } catch (e) {
    console.error(e);
  }
  res.redirect("/interview");
});

app.get("/interview/new", (req, res, next) => {
  res.render("interviewNew.ejs");
});

app.get("/interview/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM interview WHERE person_id=$1",
    [id]
  );
  res.render("interview.ejs", { interview: rows[0] });
});

app.delete("/interview/:id", async (req, res, next) => {
  const { id } = req.params;
  await pool.query("DELETE FROM interview WHERE person_id=$1", [id]);
  res.redirect("/interview");
});

//==================================================

app.get("/crimeSceneReport", async (req, res, next) => {
  const { rows } = await pool.query(
    "SELECT * FROM crime_scene_report LIMIT 100"
  );
  res.render("crimeSceneReports.ejs", { crimeSceneReportList: rows });
});

app.post("/crimeSceneReport", async (req, res, next) => {
  const new_report = req.body.crimeSceneReport;
  try {
    await pool.query("INSERT INTO crime_scene_report VALUES($1,$2,$3,$4,$5)", [
      new_report.date,
      new_report.type,
      new_report.description,
      new_report.city,
      new_report.report_id,
    ]);
  } catch (e) {
    console.error(e);
  }
  res.redirect("/crimeSceneReport");
});

app.get("/crimeSceneReport/new", (req, res, next) => {
  res.render("crimeSceneReportNew.ejs");
});

app.get("/crimeSceneReport/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM crime_scene_report WHERE report_id=$1",
    [id]
  );
  res.render("crimeSceneReport.ejs", { crimeSceneReport: rows[0] });
});

app.delete("/crimeSceneReport/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  await pool.query("DELETE FROM crime_scene_report WHERE report_id=$1", [id]);
  res.redirect("/crimeSceneReport");
});

//==============================================

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
