import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Compass,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Course } from '../data/courses';
import { AheadModal } from './AheadModal';

interface LearningHubPageProps {
  allCourses: Course[];
  enrolledCourseIds: string[];
  activeCourseId: string;
  completedActivitiesByCourse: Record<string, string[]>;
  onSelectActiveCourse: (courseId: string) => void;
  onToggleActivity: (courseId: string, activityId: string) => void;
  onBrowseCourses: () => void;
  onOpenCourseDetails: (courseId: string) => void;
}

function formatSeconds(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function LearningHubPage({
  allCourses,
  enrolledCourseIds,
  activeCourseId,
  completedActivitiesByCourse,
  onSelectActiveCourse,
  onToggleActivity,
  onBrowseCourses,
  onOpenCourseDetails,
}: LearningHubPageProps) {
  const enrolledCourses = allCourses.filter((c) => enrolledCourseIds.includes(c.id));
  const activeCourse =
    enrolledCourses.find((c) => c.id === activeCourseId) ?? enrolledCourses[0];

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isAheadOpen, setIsAheadOpen] = useState(false);

  // Reset video state when switching courses
  useEffect(() => {
    setActiveModuleIndex(0);
    setIsPlaying(false);
    setElapsedSeconds(0);
  }, [activeCourse?.id]);

  const currentModule = activeCourse?.modules[activeModuleIndex] ?? activeCourse?.modules[0];

  // Simulated video playback timer
  useEffect(() => {
    if (!isPlaying || !currentModule) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev + 1 >= currentModule.durationSeconds) {
          setIsPlaying(false);
          return currentModule.durationSeconds;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, currentModule]);

  if (!activeCourse || !currentModule) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Learning Hub</h1>
        <p className="mt-3 text-base text-slate-600">
          You have not enrolled in any courses yet. Pick a practical skill to start learning.
        </p>
        <button
          type="button"
          onClick={onBrowseCourses}
          className="mt-6 min-h-[50px] px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold cursor-pointer"
        >
          Browse All Courses
        </button>
      </div>
    );
  }

  const completedIds = completedActivitiesByCourse[activeCourse.id] ?? [];
  const totalActivities = activeCourse.activities.length;
  const completedCount = completedIds.length;
  const progressPercent =
    totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;

  const handleSelectModule = (index: number) => {
    setActiveModuleIndex(index);
    setElapsedSeconds(0);
    setIsPlaying(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Bar: Back Link */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBrowseCourses}
          className="min-h-[44px] px-3 -ml-3 rounded-xl inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 self-start transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse More Courses</span>
        </button>
      </div>

      {/* Enrolled Courses Progress Overview */}
      <section aria-label="Your enrolled courses progress" className="mt-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          <h2 className="text-sm font-semibold text-slate-700">
            Your Learning Journey ({enrolledCourses.length}{' '}
            {enrolledCourses.length === 1 ? 'enrolled course' : 'enrolled courses'})
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {enrolledCourses.map((course) => {
            const isSelected = course.id === activeCourse.id;
            const courseDoneIds = completedActivitiesByCourse[course.id] ?? [];
            const courseTotal = course.activities.length;
            const courseDoneCount = courseDoneIds.length;
            const coursePercent =
              courseTotal > 0 ? Math.round((courseDoneCount / courseTotal) * 100) : 0;

            return (
              <button
                key={course.id}
                type="button"
                onClick={() => onSelectActiveCourse(course.id)}
                aria-current={isSelected ? 'true' : undefined}
                className={`w-full min-h-[96px] p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-emerald-50/60 border-emerald-500 ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-emerald-700">{course.track}</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900 line-clamp-1">
                      {course.title}
                    </p>
                  </div>
                  {isSelected && (
                    <span className="text-xs font-semibold text-emerald-700 shrink-0">
                      Active
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-600 tabular-nums">
                      {courseDoneCount} of {courseTotal} activities
                    </span>
                    <span className="font-bold text-emerald-700 tabular-nums">
                      {coursePercent}%
                    </span>
                  </div>
                  <div
                    className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={coursePercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${course.title} completion progress`}
                  >
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${coursePercent}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Course Progress Header + "See What's Ahead" CTA */}
      <div className="mt-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-x-2 text-xs font-medium text-slate-500">
            <span className="text-emerald-700 font-semibold">{activeCourse.track}</span>
            <span aria-hidden="true">·</span>
            <span>Learning Hub</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenCourseDetails(activeCourse.id)}
              className="underline hover:text-emerald-700 cursor-pointer"
            >
              Course overview
            </button>
          </div>

          <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {activeCourse.title}
          </h1>

          {/* Progress Bar */}
          <div className="mt-4 max-w-xl">
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-medium text-slate-700 tabular-nums">
                {completedCount} of {totalActivities} activities completed
              </span>
              <span className="font-bold text-emerald-700 tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAheadOpen(true)}
          className="min-h-[52px] px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-base font-semibold inline-flex items-center justify-center gap-2.5 shrink-0 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <Compass className="w-5 h-5" />
          <span>See What's Ahead</span>
        </button>
      </div>

      {/* Main Workspace: Video Player (Left) & Practical Activity Checklist (Right) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Video Player + Key Takeaway + Lesson List */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive 16:9 Video Player */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-200">
            <div className="relative aspect-video bg-slate-900">
              <img
                src={activeCourse.imageUrl}
                alt={currentModule.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/25 flex flex-col justify-between p-4 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs sm:text-sm font-semibold text-emerald-300">
                    Video Lesson {activeModuleIndex + 1} of {activeCourse.modules.length}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white/90 tabular-nums">
                    {formatSeconds(elapsedSeconds)} / {currentModule.duration}
                  </span>
                </div>

                {/* Center Play/Pause Button */}
                <div className="flex flex-col items-center justify-center text-center my-auto px-4">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    aria-label={isPlaying ? 'Pause video lesson' : 'Play video lesson'}
                    className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7" />
                    ) : (
                      <Play className="w-7 h-7 ml-0.5" />
                    )}
                  </button>
                  <p className="mt-3 text-base sm:text-lg font-bold text-white max-w-md [text-wrap:balance]">
                    {currentModule.title}
                  </p>
                </div>

                {/* Scrubber & Controls */}
                <div className="space-y-2.5">
                  <input
                    type="range"
                    min={0}
                    max={currentModule.durationSeconds}
                    value={elapsedSeconds}
                    onChange={(e) => setElapsedSeconds(Number(e.target.value))}
                    aria-label="Seek video progress"
                    className="w-full accent-emerald-500 cursor-pointer h-2"
                  />

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          activeModuleIndex > 0 && handleSelectModule(activeModuleIndex - 1)
                        }
                        disabled={activeModuleIndex === 0}
                        aria-label="Previous lesson"
                        className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg text-white hover:bg-white/15 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <SkipBack className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsPlaying((prev) => !prev)}
                        className="min-h-[40px] px-3 rounded-lg text-sm font-semibold text-white hover:bg-white/15 inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Play</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          activeModuleIndex < activeCourse.modules.length - 1 &&
                          handleSelectModule(activeModuleIndex + 1)
                        }
                        disabled={activeModuleIndex === activeCourse.modules.length - 1}
                        aria-label="Next lesson"
                        className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg text-white hover:bg-white/15 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsMuted((prev) => !prev)}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg text-white hover:bg-white/15 cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Lesson Summary & Key Takeaway */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{currentModule.title}</h2>
              <p className="mt-2 text-base text-slate-700 leading-relaxed">
                {currentModule.videoSummary}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <p className="text-xs font-semibold text-emerald-800">Key practical takeaway</p>
              <p className="mt-1 text-sm font-medium text-emerald-950 leading-relaxed">
                {currentModule.keyTakeaway}
              </p>
            </div>
          </div>

          {/* Video Lesson Switcher List */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-base font-bold text-slate-900">Video Lessons in This Course</h2>
            <div className="mt-4 space-y-2.5">
              {activeCourse.modules.map((mod, idx) => {
                const isActive = idx === activeModuleIndex;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => handleSelectModule(idx)}
                    className={`w-full min-h-[56px] p-4 rounded-xl border text-left flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Play className="w-4 h-4" />
                      </span>
                      <span className="text-sm font-semibold truncate">{mod.title}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500 tabular-nums shrink-0">
                      {mod.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Practical Activity Checklist */}
        <aside className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Hands-On Activity Checklist</h2>
            <p className="mt-1 text-sm text-slate-600">
              Tap each real-world task as you practice it.
            </p>
          </div>

          <div className="space-y-3">
            {activeCourse.activities.map((activity) => {
              const isDone = completedIds.includes(activity.id);
              return (
                <button
                  key={activity.id}
                  type="button"
                  onClick={() => onToggleActivity(activeCourse.id, activity.id)}
                  aria-pressed={isDone}
                  className={`w-full min-h-[64px] p-4 rounded-xl border text-left flex items-start gap-3.5 transition-colors cursor-pointer ${
                    isDone
                      ? 'bg-emerald-50/80 border-emerald-300'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white border-slate-300 text-transparent'
                    }`}
                    aria-hidden="true"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-sm font-semibold leading-snug ${
                          isDone ? 'text-emerald-950 line-through' : 'text-slate-900'
                        }`}
                      >
                        {activity.title}
                      </span>
                      <span className="text-xs text-slate-500 tabular-nums shrink-0 mt-0.5">
                        {activity.estimatedMinutes} min
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      Tip: {activity.practicalTip}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {completedCount === totalActivities && totalActivities > 0 && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold text-emerald-950">
                    All activities completed!
                  </p>
                  <p className="mt-0.5 text-xs text-emerald-900">
                    Ready for the upcoming modules and next-step courses?
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAheadOpen(true)}
                className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                See What's Ahead
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* See What's Ahead Roadmap Modal */}
      <AheadModal
        isOpen={isAheadOpen}
        course={activeCourse}
        allCourses={allCourses}
        onClose={() => setIsAheadOpen(false)}
        onSelectNextCourse={(courseId) => onOpenCourseDetails(courseId)}
      />
    </div>
  );
}
