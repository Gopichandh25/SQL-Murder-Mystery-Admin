const { v4: uuid } = require('uuid');

module.exports.driversLicenseList = [{
    id:uuid(),
    age:22,
    height: 57,
    eye_color : "brown",
    hair_color : "red",
    gender : "male",
    plate_number : "P24L4U",
    car_make : "Acura",
    car_model : "MDX"
}];

module.exports.facebookEventCheckinList = [{
    person_id: 28508,event_id:5880,event_name:"Nudists are people who wear one-button suits.",date:20170913
}];
module.exports.personList = [{
   id:10000,name:"Christoper Peteuil",license_id:993845,address_number:624,address_street_name:"Bankhall Ave",ssn:747714076
}];
module.exports.getFitNowMemberList = [{
    id:"3F8N0",person_id:10319,name:"Tama Mazy",membership_start_date:20171021,membership_status:"gold"
}];
module.exports.getFitNowCheckinList = [{
    membership_id:"NL318",check_in_date:20180212,check_in_time:329,check_out_time:365
}];

//{ id: 'NL318', date: '20180212', time: '329'
module.exports.interviewList = [{
    person_id:28508,transcript:"‘I deny it!’ said the March Hare."
}];
module.exports.crimeSceneReportList = [{
    date:20180115,type:"robbery",description:"A Man Dressed as Spider-Man Is on a Robbery Spree",report_id:1,city:"NYC"
}];
module.exports.incomeList = [{
    ssn:100009868,annual_income:52200
}]