import { useCallback, useState } from 'react';
import { COURSES, SkillTrack } from './data/courses';
import { Navbar, PageView } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CourseDetailsPage } from './components/CourseDetailsPage';
import { LearningHubPage } from './components/LearningHubPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedTrack, setSelectedTrack] = useState<SkillTrack | 'All'>('All');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES[0].id);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([COURSES[0].id]);
  const [activeHubCourseId, setActiveHubCourseId] = useState<string>(COURSES[0].id);
  const [justEnrolledId, setJustEnrolledId] = useState<string | null>(null);
  const [completedActivitiesByCourse, setCompletedActivitiesByCourse] = useState<
    Record<string, string[]>
  >({
    [COURSES[0].id]: [COURSES[0].activities[0].id],
  });
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem('skill-buddy-search-history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((item): item is string => typeof item === 'string').slice(0, 3);
        }
      }
    } catch {
      // Ignore storage access issues
    }
    return [];
  });

  const handleRecordSearch = useCallback((rawTerm: string) => {
    const trimmed = rawTerm.trim();
    if (trimmed.length < 2) return;
    setSearchHistory((prev) => {
      const next = [
        trimmed,
        ...prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase()),
      ].slice(0, 3);
      try {
        window.localStorage.setItem('skill-buddy-search-history', JSON.stringify(next));
      } catch {
        // Ignore storage write errors
      }
      return next;
    });
  }, []);

  const handleClearSearchHistory = useCallback(() => {
    setSearchHistory([]);
    try {
      window.localStorage.removeItem('skill-buddy-search-history');
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setActivePage('home');
    setJustEnrolledId(null);
    scrollToTop();
  };

  const handleNavigateCatalog = () => {
    setActivePage('home');
    setJustEnrolledId(null);
    window.setTimeout(() => {
      const el = document.getElementById('course-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleSelectTrackFromFooter = (track: SkillTrack) => {
    setSelectedTrack(track);
    setActivePage('home');
    window.setTimeout(() => {
      const el = document.getElementById('course-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleNavigateHub = () => {
    setActivePage('hub');
    setJustEnrolledId(null);
    scrollToTop();
  };

  const handleOpenCourseDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
    setJustEnrolledId(null);
    setActivePage('details');
    scrollToTop();
  };

  const handleEnrollCourse = (courseId: string) => {
    setEnrolledCourseIds((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]));
    setActiveHubCourseId(courseId);
    setJustEnrolledId(courseId);
  };

  const handleStartLearning = (courseId: string) => {
    setEnrolledCourseIds((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]));
    setActiveHubCourseId(courseId);
    setJustEnrolledId(null);
    setActivePage('hub');
    scrollToTop();
  };

  const handleToggleActivity = (courseId: string, activityId: string) => {
    setCompletedActivitiesByCourse((prev) => {
      const current = prev[courseId] ?? [];
      const exists = current.includes(activityId);
      const updated = exists
        ? current.filter((id) => id !== activityId)
        : [...current, activityId];
      return { ...prev, [courseId]: updated };
    });
  };

  const selectedCourse = COURSES.find((c) => c.id === selectedCourseId) ?? COURSES[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        activePage={activePage}
        enrolledCount={enrolledCourseIds.length}
        onNavigateHome={handleNavigateHome}
        onNavigateCatalog={handleNavigateCatalog}
        onNavigateHub={handleNavigateHub}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            courses={COURSES}
            enrolledCourseIds={enrolledCourseIds}
            selectedTrack={selectedTrack}
            searchHistory={searchHistory}
            onRecordSearch={handleRecordSearch}
            onClearSearchHistory={handleClearSearchHistory}
            onSelectTrack={setSelectedTrack}
            onSelectCourse={handleOpenCourseDetails}
            onNavigateHub={handleNavigateHub}
          />
        )}

        {activePage === 'details' && (
          <CourseDetailsPage
            course={selectedCourse}
            allCourses={COURSES}
            isEnrolled={enrolledCourseIds.includes(selectedCourse.id)}
            justEnrolled={justEnrolledId === selectedCourse.id}
            onBackHome={handleNavigateHome}
            onEnroll={handleEnrollCourse}
            onStartLearning={handleStartLearning}
            onSelectCourse={handleOpenCourseDetails}
          />
        )}

        {activePage === 'hub' && (
          <LearningHubPage
            allCourses={COURSES}
            enrolledCourseIds={enrolledCourseIds}
            activeCourseId={activeHubCourseId}
            completedActivitiesByCourse={completedActivitiesByCourse}
            onSelectActiveCourse={setActiveHubCourseId}
            onToggleActivity={handleToggleActivity}
            onBrowseCourses={handleNavigateCatalog}
            onOpenCourseDetails={handleOpenCourseDetails}
          />
        )}
      </main>

      <Footer
        onNavigateHome={handleNavigateCatalog}
        onSelectTrack={handleSelectTrackFromFooter}
        onNavigateHub={handleNavigateHub}
      />
    </div>
  );
}
