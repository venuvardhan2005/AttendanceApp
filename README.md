# Smart Curriculum Activity & Attendance App

A comprehensive React-based frontend for attendance tracking and activity management in educational institutions.

## 🌟 Features

### 🔐 Authentication System
- Full Sign-Up and Sign-In flow
- JWT-based login/signup with form validation
- Role-based access control (Student, Teacher, Admin)
- Protected routes with automatic redirects
- Realistic mock user data powered by Faker.js

### 👥 User Roles & Dashboards

#### Students
- Personal attendance tracking and history
- QR code scanning for attendance
- Personalised activity suggestions
- Daily routine planning
- Progress tracking

#### Teachers
- QR code generation for class sessions
- Real-time attendance monitoring
- Student management
- Class scheduling

#### Admins
- Comprehensive analytics dashboard
- User management system (view students/teachers, create new users)
- **Subject Management**: Add new course subjects to the system.
- Attendance reports and insights
- System-wide statistics

### 📊 Attendance Module
- **Robust QR code scanning**: Uses device camera to mark attendance in real-time.
- Face recognition placeholder (future AI integration)
- Real-time attendance tracking
- Historical attendance records
- Attendance percentage calculations

### 🎯 Activity Suggestion Engine
- Personalised recommendations based on student profiles
- Activity categories: Practice quizzes, Career guidance, Skill-building

### 📅 Daily Routine Generator
- Automated schedule creation based on classes and free time.

### 📈 Analytics & Reports
- Interactive charts and visualisations
- Attendance trends and patterns
- Department-wise statistics
- Low attendance alerts

## 🚀 Tech Stack

- **Frontend**: React 19 + JavaScript
- **Styling**: Tailwind CSS
- **Mock Data**: @faker-js/faker
- **Forms**: React Hook Form + Yup
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API
- **Routing**: React Router DOM

## 🛠️ Installation & Setup

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Start Development Server**
   ```bash
   yarn dev
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`

## 🔑 Demo Accounts

Use these credentials to test different user roles:

- **Student**: `student@example.com` (any password)
- **Teacher**: `teacher@example.com` (any password)  
- **Admin**: `admin@example.com` (any password)

Or, create your own account using the **Sign-Up** form!

## 📱 Responsive Design

The application is fully responsive and optimised for mobile, tablet, and desktop devices.

---

**Note**: This is a frontend-only implementation with a simulated in-memory database. All data will reset on page refresh.
