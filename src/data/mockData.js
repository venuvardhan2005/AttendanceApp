import { faker } from '@faker-js/faker';

// --- IN-MEMORY DATABASE ---
export let mockUsers = [];
export let mockSubjects = [
    { id: '1', name: 'Data Structures', code: 'CS101' },
    { id: '2', name: 'Algorithms', code: 'CS102' },
    { id: '3', name: 'Database Systems', code: 'CS201' },
    { id: '4', name: 'Calculus', code: 'MA101' },
    { id: '5', name: 'Quantum Physics', code: 'PH301' },
];
export let mockAttendance = [];

// --- DATA GENERATION ---
const createMockStudent = (id, user) => ({
  ...user,
  id: id.toString(),
  role: 'student',
  studentId: `STU${faker.string.numeric(4)}`,
  department: faker.helpers.arrayElement(['Computer Science', 'Mathematics', 'Physics', 'Chemistry']),
  year: faker.number.int({ min: 1, max: 4 }),
  interests: faker.helpers.arrayElements(['AI', 'Web Development', 'Data Science', 'Cybersecurity', 'Mobile Dev'], { min: 1, max: 3 }),
  skills: faker.helpers.arrayElements(['React', 'Python', 'Java', 'SQL', 'Docker'], { min: 1, max: 3 }),
  careerGoals: [faker.person.jobTitle()],
  createdAt: faker.date.past().toISOString(),
});

const createMockTeacher = (id, user) => ({
  ...user,
  id: id.toString(),
  role: 'teacher',
  employeeId: `EMP${faker.string.numeric(4)}`,
  department: faker.helpers.arrayElement(['Computer Science', 'Mathematics', 'Physics']),
  subjects: faker.helpers.arrayElements(mockSubjects.map(s => s.name), { min: 1, max: 2 }),
  createdAt: faker.date.past().toISOString(),
});

const createMockAdmin = (id, user) => ({
  ...user,
  id: id.toString(),
  role: 'admin',
  permissions: ['all'],
  createdAt: faker.date.past().toISOString(),
});

const generateUsers = (count) => {
  const users = [];
  users.push(createMockStudent(1, { email: 'student@example.com', name: 'Alice Student' }));
  users.push(createMockTeacher(2, { email: 'teacher@example.com', name: 'Dr. Bob Teacher' }));
  users.push(createMockAdmin(3, { email: 'admin@example.com', name: 'Eve Admin' }));

  for (let i = 4; i <= count; i++) {
    const user = { email: faker.internet.email(), name: faker.person.fullName() };
    const role = faker.helpers.arrayElement(['student', 'student', 'teacher']);
    if (role === 'student') {
      users.push(createMockStudent(i, user));
    } else {
      users.push(createMockTeacher(i, user));
    }
  }
  return users;
};

mockUsers = generateUsers(20);

// --- SCHEDULE & ACTIVITIES ---
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const generateSchedule = () => {
    const schedule = [];
    const classTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'];
    daysOfWeek.slice(1, 6).forEach(day => { // Monday to Friday
        const dailyClasses = faker.helpers.arrayElements(classTimes, { min: 2, max: 4 });
        dailyClasses.forEach(time => {
            const subject = faker.helpers.arrayElement(mockSubjects);
            const startTime = time;
            const endHour = parseInt(startTime.split(':')[0]) + 1;
            const endTime = `${endHour.toString().padStart(2, '0')}:00`;
            schedule.push({
                id: faker.string.uuid(),
                day,
                startTime,
                endTime,
                title: subject.name,
                type: 'class',
                location: `Room ${faker.string.alphanumeric(3).toUpperCase()}`,
                description: `A lecture on ${subject.name}.`
            });
        });
    });
    return schedule;
};
export const mockSchedule = generateSchedule();

export const mockActivities = [
    {
      id: '1',
      title: 'React.js Fundamentals Quiz',
      contentType: 'quiz',
      quizId: 'react_quiz_1',
      difficulty: 'intermediate',
      estimatedTime: 15,
      rating: 4.5,
    },
    {
      id: '2',
      title: 'Software Engineering Career Path',
      contentType: 'video',
      contentUrl: 'https://www.youtube.com/embed/T31_s4s_i3E',
      difficulty: 'beginner',
      estimatedTime: 45,
      rating: 4.8,
    },
    {
      id: '3',
      title: 'Python Data Structures Challenge',
      contentType: 'quiz',
      quizId: 'python_quiz_1',
      difficulty: 'advanced',
      estimatedTime: 20,
      rating: 4.6,
    },
];

export const mockQuizzes = {
    react_quiz_1: {
        title: 'React.js Fundamentals',
        questions: [
            { question: 'What is JSX?', options: ['A JavaScript syntax extension', 'A templating engine', 'A CSS preprocessor'], answer: 0 },
            { question: 'Which hook is used for state management in functional components?', options: ['useEffect', 'useState', 'useContext'], answer: 1 },
            { question: 'How do you pass data from a parent to a child component?', options: ['State', 'Context', 'Props'], answer: 2 },
        ]
    },
    python_quiz_1: {
        title: 'Python Data Structures',
        questions: [
            { question: 'Which data structure is ordered and mutable?', options: ['Tuple', 'List', 'Set'], answer: 1 },
            { question: 'What is the time complexity for adding an element to a set?', options: ['O(n)', 'O(log n)', 'O(1)'], answer: 2 },
        ]
    }
};

// --- API SIMULATION ---
export const addUser = (userData) => {
  const newId = mockUsers.length + 1;
  let newUser;
  const baseUser = { email: userData.email, name: userData.name };
  if (userData.role === 'student') newUser = createMockStudent(newId, baseUser);
  else newUser = createMockTeacher(newId, baseUser);
  mockUsers.push(newUser);
  return newUser;
};

export const addSubject = (subjectData) => {
    const newSubject = { id: (mockSubjects.length + 1).toString(), ...subjectData };
    mockSubjects.push(newSubject);
    // In a real app, you might trigger a schedule regeneration or update
    return newSubject;
};

export const getSubjects = () => mockSubjects;
export const getStudents = () => mockUsers.filter(u => u.role === 'student');
export const getTeachers = () => mockUsers.filter(u => u.role === 'teacher');
