// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Patient from './src/models/Patient.js';

// dotenv.config();

// const seedPatients = [
//   {
//     patientId: 'PAT-0001',
//     firstName: 'John',
//     lastName: 'Doe',
//     gender: 'Male',
//     dob: new Date('1990-01-01'),
//   },
//   {
//     patientId: 'PAT-0002',
//     firstName: 'Jane',
//     lastName: 'Doe',
//     gender: 'Female',
//     dob: new Date('1995-05-05'),
//   },
// ];

// const seedDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);

//     await Patient.deleteMany({});
//     await Patient.insertMany(seedPatients);

//     console.log('Database seeded successfully');
//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     mongoose.connection.close();
//   }
// };

// seedDB();
