import React, { useEffect, useState } from "react";

import PullProgrammes from "../PullProgrammes";
import PullCourses from "../PullCourses";
import PullProgrammeCourses from "../PullProgrammeCourses";

var programmes = PullProgrammes();
var courses = PullCourses();
var progCourses = PullProgrammeCourses();



// const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

// // Create sequelize instance and define your models
// const sequelize = new Sequelize('advisor-app-uwi', 'advisor-app-uwi', 'phe3aeB5yopha7sh', {
//   host: 'postgres_14',
//   dialect: 'postgres',
// });

// //import it instead
// const Programme = sequelize.define('Programme', {
//   name: DataTypes.STRING,
// });

// const Courses = sequelize.define('Courses', {
//   courseCode: DataTypes.STRING,
//   courseTitle: DataTypes.STRING,
//   level: DataTypes.STRING,
// });

// // Define associations between models
// User.hasMany(Post);
// Post.belongsTo(User);

// Dump data into JSON
// async function dumpDataToJson() {
//   try {
//     // Fetch all users and their associated posts
//     const users = await User.findAll({ include: [Post] });

//     // Convert data to plain JSON objects
//     const data = users.map(user => user.get({ plain: true }));

//     // Write data to JSON file
//     fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
//     console.log('Data dumped into data.json');
//   } catch (error) {
//     console.error('Error dumping data:', error);
//   } finally {
//     // Close the sequelize connection
//     sequelize.close();
//   }
// }

// // Call the dumpDataToJson function to start dumping data
// dumpDataToJson();
