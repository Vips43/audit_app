import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './model/questionModal.js';

dotenv.config();

const sampleQuestions = [
  {
    text: "Are fire extinguishers charged, unexpired, and visibly accessible?",
    category: "Safety & Environment",
    riskLevel: "critical",
    applicableDepartment: "All"
  },
  {
    text: "Are all financial transactions above $10,000 co-signed by an authorized manager?",
    category: "Financial Control",
    riskLevel: "high",
    applicableDepartment: "Finance"
  },
  {
    text: "Are system access logs reviewed weekly for unauthorized entry attempts?",
    category: "IT Security",
    riskLevel: "high",
    applicableDepartment: "IT"
  },
  {
    text: "Is emergency lighting operational along all designated exit pathways?",
    category: "Safety & Environment",
    riskLevel: "medium",
    applicableDepartment: "All"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔄 Connected to MongoDB for seeding...');

    // Clear existing questions to avoid clutter
    await Question.deleteMany({});
    console.log('🗑️ Cleared old questions');

    // Insert new sample compliance list
    await Question.insertMany(sampleQuestions);
    console.log('🌱 Database seeded successfully with audit questions!');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();