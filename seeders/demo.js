const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Collection = require('../models/collectionModel');

const generateSampleData = async () => {
  try {
    console.log('------------------');
    console.log('>> Demo mode detected: checking seed data...');

    const demoPassword = 'demo123!';
    const demoUsers = [
      {
        username: 'alexmorgan',
        email: 'alex.morgan@demo.com',
      },
      {
        username: 'samrivera',
        email: 'sam.rivera@demo.com',
      },
      {
        username: 'jamiechen',
        email: 'jamie.chen@demo.com',
      },
    ];

    const displayDemoLogin = () => {
      console.log('------------------');
      console.log(`>> Demo accounts: ${demoUsers.map((user) => user.username).join(', ')}`)
      console.log(`>> Use password '${demoPassword}'`);
      console.log('------------------');
    }

    const existingDemoUser = await User.findOne({
      email: demoUsers[0]?.email,
    });

    if (existingDemoUser) {
      console.log('>> Demo seed skipped: demo users already exist.');
      displayDemoLogin();
      return;
    }
  
    // 1. ADD USERS (AND POPULATE WITH PASSWORD HASH)
    const demoPasswordHash = await bcrypt.hash(demoPassword, 10);
    demoUsers.forEach(user => user.passwordHash = demoPasswordHash);

    const [alex, sam, jamie] = await User.insertMany(demoUsers);

    // 2. ADD COLLECTIONS
    const collections = await Collection.insertMany([
      {
        name: '📚 School',
        description: 'Lecture notes and assignments.',
        color: '#2563eb',
        author: alex._id,
      },
      {
        name: '⭐️ Personal',
        description: 'Personal reminders and plans.',
        color: '#7c3aed',
        author: alex._id,
      },
      {
        name: '🍳 Cooking',
        description: 'Meals and grocery ideas.',
        color: '#ea580c',
        author: sam._id,
      },
      {
        name: '🏃 Health & Fitness',
        description: 'Workouts and cardio goals.',
        color: '#dc2626',
        author: sam._id,
      },
      {
        name: '📎 Projects',
        description: 'Coding tasks and feature ideas.',
        color: '#1f2937',
        author: jamie._id,
      },
      {
        name: '📆 Meetings',
        description: 'Meeting notes and follow-ups.',
        color: '#475569',
        author: jamie._id,
      },
    ]);

    const alexSchool = collections.find(
      (collection) =>
        collection.name === '📚 School' &&
        collection.author.toString() === alex._id.toString()
    );

    const alexPersonal = collections.find(
      (collection) =>
        collection.name === '⭐️ Personal' &&
        collection.author.toString() === alex._id.toString()
    );

    const samRecipes = collections.find(
      (collection) =>
        collection.name === '🍳 Cooking' &&
        collection.author.toString() === sam._id.toString()
    );

    const samFitness = collections.find(
      (collection) =>
        collection.name === '🏃 Health & Fitness' &&
        collection.author.toString() === sam._id.toString()
    );

    const jamieProjects = collections.find(
      (collection) =>
        collection.name === '📎 Projects' &&
        collection.author.toString() === jamie._id.toString()
    );

    const jamieMeetings = collections.find(
      (collection) =>
        collection.name === '📆 Meetings' &&
        collection.author.toString() === jamie._id.toString()
    );

    // 3. ADD NOTES
    const cleanIndentation = (text) => text.replace(/^[ \t]+/gm, '').trim();

    await Note.insertMany([

      // ALEX NOTES
      {
        title: 'Review MongoDB relationships',
        content: 'Understand how users, notes, and collections connect.',
        author: alex._id,
        collection: alexSchool._id,
        isPinned: true,
      },
      {
        title: 'Finish app routes',
        content: 'Create CRUD routes for notes and collections.',
        author: alex._id,
        collection: alexSchool._id,
      },
      {
        title: 'Weekend errands',
        content: 'Buy groceries, clean desk, and do laundry.',
        author: alex._id,
        collection: alexPersonal._id,
      },
      {
        title: 'Biology Exam Review',
        content: cleanIndentation(`
          # Biology Midterm

          ## Chapters to Review

          - Cell Structure
          - Membrane Transport
          - Photosynthesis

          ## Important

          Remember ATP cycle and osmosis.
        `),
        author: alex._id,
        collection: alexSchool._id,
        isPinned: true,
      },
      {
        title: 'Vacation Checklist',
        content: cleanIndentation(`
          # Packing List

          - Passport
          - Charger
          - Running shoes
          - Camera
        `),
        author: alex._id,
      },
      {
        title: 'Deleted Lecture',
        content: cleanIndentation(`
          Old lecture notes.

          No longer needed.
        `),
        author: alex._id,
        isDeleted: true,
      },
      {
        title: 'Express.js Notes',
        content: cleanIndentation(`
          # Express Cheat Sheet

          ## Middleware

          Middleware functions have access to:

          - req
          - res
          - next

          Example:

          \`\`\`js
          app.use(express.json());
          \`\`\`
        `),
        author: alex._id,
        collection: alexPersonal._id,
      },
      {
        title: 'Daily Journal',
        content: cleanIndentation(`
          # June 20

          Today I worked on the NoteFlow UI.

          Things completed:

          - Sidebar redesign
          - Dark mode
          - Markdown preview

          Next:

          - Drag and drop
          - Autosave
        `),
        author: alex._id,
        collection: alexPersonal._id,
      },

      // SAM NOTES
      {
        title: 'Chicken rice bowl',
        content: 'Chicken, rice, plantains, and spicy sauce.',
        author: sam._id,
        collection: samRecipes._id,
        isPinned: true,
      },
      {
        title: 'Grocery list',
        content: 'Rice, chicken, eggs, yogurt, bananas, and spinach.',
        author: sam._id,
        collection: samRecipes._id,
      },
      {
        title: 'Upper body workout',
        content: 'Bench press, rows, shoulder press, curls, and triceps.',
        author: sam._id,
        collection: samFitness._id,
      },
      {
        title: 'Workout Plan',
        content: cleanIndentation(`
          # Weekly Training

          ## Monday
          - 5 km easy run
          - Upper body

          ## Wednesday
          - Tempo run

          ## Saturday
          - Long run 15 km
        `),
        author: sam._id,
        collection: samFitness._id,
      },
      {
        title: 'Deleted Draft',
        content: 'Temporary draft note',
        author: sam._id,
        isDeleted: true,
      },

      // JAMIE NOTES
      {
        title: 'Build dashboard',
        content: 'Show recent notes, pinned notes, and collections.',
        author: jamie._id,
        collection: jamieProjects._id,
        isPinned: true,
      },
      {
        title: 'Authorization middleware',
        content: 'Make sure users only access their own notes.',
        author: jamie._id,
        collection: jamieProjects._id,
      },
      {
        title: 'Team meeting',
        content: 'Discuss models, routes, controllers, and final demo flow.',
        author: jamie._id,
        collection: jamieMeetings._id,
      },
      {
        title: 'Project Ideas',
        content: cleanIndentation(`
          # SaaS Ideas

          1. AI-powered note app
          2. Running club dashboard
          3. Fitness habit tracker
        `),
        author: jamie._id,
        collection: jamieProjects._id,
      },
      {
        title: 'Meeting Notes',
        content: cleanIndentation(`
          # Team Meeting

          - Finalize UI mockups
          - Complete authentication
          - Prepare presentation
        `),
        author: jamie._id,
        collection: jamieMeetings._id,
        isPinned: true,
      },
      {
        title: 'Markdown Demo',
        content: cleanIndentation(`
          # Markdown Examples

          ## Bold

          **Important text**

          ## Code

          \`\`\`javascript
          const app = express();
          \`\`\`

          > Blockquotes are supported.

          - Item 1
          - Item 2
          - Item 3
        `),
        author: jamie._id,
        collection: jamieProjects._id,
        isPinned: true,
      },
    ]);

    console.log('>> Demo seed completed successfully!');
    displayDemoLogin();
  } catch (error) {
    console.error('>> Demo seed failed:', '\n\t', error);
  }
};

module.exports = generateSampleData;