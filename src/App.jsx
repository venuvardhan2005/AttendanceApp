import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthPage } from './components/Auth/AuthPage';
import { Navbar } from './components/Layout/Navbar';
import { Sidebar } from './components/Layout/Sidebar';
import { StudentDashboard } from './components/Dashboard/StudentDashboard';
import { TeacherDashboard } from './components/Dashboard/TeacherDashboard';
import { AdminDashboard } from './components/Dashboard/AdminDashboard';
import { QRGenerator } from './components/Attendance/QRGenerator';
import { QRScanner } from './components/Attendance/QRScanner';
import { ActivitySuggestions } from './components/Activities/ActivitySuggestions';
import { Schedule } from './components/Schedule/Schedule';
import { DailyRoutine } from './components/Routine/DailyRoutine';
import { AttendanceManagement } from './components/Management/AttendanceManagement';
import { StudentManagement } from './components/Management/StudentManagement';
import { UserManagement } from './components/Management/UserManagement';
import { SubjectManagement } from './components/Management/SubjectManagement';
import { Settings } from './components/Settings/Settings';
import { ActivityModal } from './components/Activities/ActivityModal';
import { ScheduleEventModal } from './components/Schedule/ScheduleEventModal';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activityModalData, setActivityModalData] = useState(null);
  const [scheduleEventData, setScheduleEventData] = useState(null);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (user?.role === 'student') return <StudentDashboard user={user} onStartActivity={setActivityModalData} />;
        if (user?.role === 'teacher') return <TeacherDashboard user={user} />;
        if (user?.role === 'admin') return <AdminDashboard user={user} />;
        break;
      
      case 'qr-generator': return <QRGenerator />;
      case 'attendance': return <QRScanner />;
      case 'activities': return <ActivitySuggestions onStartActivity={setActivityModalData} />;
      case 'schedule': return <Schedule onEventClick={setScheduleEventData} />;
      case 'routine': return <DailyRoutine onTabChange={handleTabChange}/>;
      case 'attendance-management': return <AttendanceManagement />;
      case 'students': return <StudentManagement />;
      case 'analytics': return <AdminDashboard user={user} />;
      case 'users': return <UserManagement />;
      case 'subjects': return <SubjectManagement />;
      case 'settings': return <Settings />;
        
      default:
        return (
          <div className="p-6"><h1 className="text-2xl font-bold">Page Not Found</h1></div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto" style={{ height: 'calc(100vh - 65px)' }}>
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {activityModalData && (
        <ActivityModal 
          activity={activityModalData} 
          onClose={() => setActivityModalData(null)} 
        />
      )}

      {scheduleEventData && (
        <ScheduleEventModal
          event={scheduleEventData}
          onClose={() => setScheduleEventData(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
