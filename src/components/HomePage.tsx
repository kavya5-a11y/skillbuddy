import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, History, Search, X } from 'lucide-react';
import {
  Course,
  CourseLevel,
  HERO_IMAGE_URL,
  SKILL_TRACKS,
  SkillTrack,
} from '../data/courses';
import { CourseImage } from './CourseImage';

interface HomePageProps {
  courses: Course[];
  enrolledCourseIds: string[];
  selectedTrack: SkillTrack | 'All';
  searchHistory: string[];
  onRecordSearch: (term: string) => void;
  onClearSearchHistory: () => void;
  onSelectTrack: (track: SkillTrack | 'All') => void;
  onSelectCourse: (courseId: string) => void;
  onNavigateHub: () => void;
}

export function HomePage({
  courses,
  enrolledCourseIds,
  selectedTrack,
  searchHistory,
  onRecordSearch,
  onClearSearchHistory,
  onSelectTrack,
  onSelectCourse,
  onNavigateHub,
}: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | 'All'>('All');

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesTrack = selectedTrack === 'All' || course.track === selectedTrack;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      const matchesQuery =
        query.length === 0 ||
        course.title.toLowerCase().includes(query) ||
        course.shortSummary.toLowerCase().includes(query) ||
        course.track.toLowerCase().includes(query) ||
        course.toolsCovered.some((tool) => tool.toLowerCase().includes(query));
      return matchesTrack && matchesLevel && matchesQuery;
    });
  }, [courses, searchQuery, selectedTrack, selectedLevel]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedTrack !== 'All' || selectedLevel !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    onSelectTrack('All');
    setSelectedLevel('All');
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('course-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Record meaningful search queries after a brief typing pause
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) return;
    const timer = window.setTimeout(() => {
      onRecordSearch(trimmed);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [searchQuery, onRecordSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      onRecordSearch(searchQuery);
    }
  };

  const handleApplyRecentSearch = (term: string) => {
    setSearchQuery(term);
    onRecordSearch(term);
  };

  const handleOpenCourse = (courseId: string) => {
    if (searchQuery.trim().length >= 2) {
      onRecordSearch(searchQuery);
    }
    onSelectCourse(courseId);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-sm font-semibold text-emerald-700">
                Built for people who want to upgrade their life
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.15] [text-wrap:balance]">
                Practical workplace skills colleges and schools never taught you.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Short video lessons and step-by-step checklists covering team Git workflows, Excel reporting, Agile sprints, first-paycheck taxes, and job interviews.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToCatalog}
                  className="min-h-[50px] px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-base font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={onNavigateHub}
                  className="min-h-[50px] px-6 py-3 rounded-xl bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-800 border border-slate-300 text-base font-semibold inline-flex items-center justify-center transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Open Learning Hub
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <CourseImage
                  src={HERO_IMAGE_URL}
                  alt="Recent college graduates collaborating on practical job skills"
                  aspectClass="aspect-[16/10] lg:aspect-auto lg:h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog + Search & Filter Section */}
      <section id="course-catalog" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Browse practical courses
            </h2>
            <p className="mt-1.5 text-base text-slate-600">
              Search any tool or topic, or filter by the skill track you want to build next.
            </p>
          </div>
          <p className="text-sm font-medium text-slate-600 tabular-nums whitespace-nowrap shrink-0">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <Search
                className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (searchQuery.trim().length >= 2) {
                    onRecordSearch(searchQuery);
                  }
                }}
                placeholder="Search skills, tools, or topics (e.g. Excel, Git, Interview, Taxes)..."
                aria-label="Search courses"
                className="w-full min-h-[48px] pl-12 pr-11 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-base text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Level Segmented Control */}
            <div
              role="group"
              aria-label="Filter by experience level"
              className="inline-flex items-center p-1 bg-slate-100 rounded-xl self-start lg:self-auto"
            >
              {(['All', 'Starter', 'Job-Ready'] as const).map((level) => {
                const active = selectedLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedLevel(level)}
                    className={`min-h-[40px] px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {level === 'All' ? 'All Levels' : level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Last 3 Searched Terms */}
          {searchHistory.length > 0 && (
            <div
              aria-label="Recent searches"
              className="flex flex-wrap items-center gap-2 text-sm"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 mr-1">
                <History className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Recent searches:</span>
              </span>
              {searchHistory.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleApplyRecentSearch(term)}
                  className="min-h-[36px] px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-200 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {term}
                </button>
              ))}
              <button
                type="button"
                onClick={onClearSearchHistory}
                className="min-h-[36px] px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}

          {/* Interactive Track Filter Buttons */}
          <div
            role="group"
            aria-label="Filter by skill track"
            className="flex flex-wrap items-center gap-2 pt-1"
          >
            <button
              type="button"
              onClick={() => onSelectTrack('All')}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedTrack === 'All'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Tracks
            </button>
            {SKILL_TRACKS.map((track) => {
              const isSelected = selectedTrack === track;
              return (
                <button
                  key={track}
                  type="button"
                  onClick={() => onSelectTrack(track)}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {track}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No courses match your search
            </h3>
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
              Try clearing your search words or switching back to all skill tracks.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-5 min-h-[48px] px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              return (
                <article
                  key={course.id}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col transition-shadow hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => handleOpenCourse(course.id)}
                    className="text-left focus:outline-none cursor-pointer"
                  >
                    <CourseImage src={course.imageUrl} alt={course.title} />
                  </button>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    {/* Unboxed clean metadata */}
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                      <span className="text-emerald-700 font-semibold">{course.track}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{course.durationLabel}</span>
                    </div>

                    <h3 className="mt-2.5 text-lg font-bold text-slate-900 leading-snug">
                      <button
                        type="button"
                        onClick={() => handleOpenCourse(course.id)}
                        className="text-left hover:text-emerald-700 transition-colors cursor-pointer"
                      >
                        {course.title}
                      </button>
                    </h3>

                    <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                      {course.shortSummary}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums">
                        <span>
                          {course.modules.length} videos · {course.activities.length} activities
                        </span>
                        {isEnrolled && (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Enrolled</span>
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenCourse(course.id)}
                        className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                          isEnrolled
                            ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        <span>{isEnrolled ? 'View Enrolled Course' : 'View Course Details'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
