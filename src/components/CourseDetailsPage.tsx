import { ArrowLeft, ArrowRight, CheckCircle2, ListChecks, PlayCircle } from 'lucide-react';
import { Course } from '../data/courses';
import { CourseImage } from './CourseImage';

interface CourseDetailsPageProps {
  course: Course;
  allCourses: Course[];
  isEnrolled: boolean;
  justEnrolled: boolean;
  onBackHome: () => void;
  onEnroll: (courseId: string) => void;
  onStartLearning: (courseId: string) => void;
  onSelectCourse: (courseId: string) => void;
}

export function CourseDetailsPage({
  course,
  allCourses,
  isEnrolled,
  justEnrolled,
  onBackHome,
  onEnroll,
  onStartLearning,
  onSelectCourse,
}: CourseDetailsPageProps) {
  const relatedCourses = allCourses.filter((c) => course.relatedIds.includes(c.id));
  const nextStepCourses = allCourses.filter((c) => course.nextStepIds.includes(c.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back navigation */}
      <button
        type="button"
        onClick={onBackHome}
        className="min-h-[44px] px-3 -ml-3 rounded-xl inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Courses</span>
      </button>

      {/* Main Course Details Overview */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Course Explanation & Outcomes */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-sm font-medium text-slate-500">
              <span className="text-emerald-700 font-semibold">{course.track}</span>
              <span aria-hidden="true">·</span>
              <span>{course.level}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{course.durationLabel}</span>
            </div>

            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight [text-wrap:balance]">
              {course.title}
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              Guided by <span className="font-semibold text-slate-900">{course.instructor}</span> ·{' '}
              {course.instructorRole}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">What this course is about</h2>
              <p className="mt-2.5 text-base text-slate-700 leading-relaxed">{course.about}</p>
            </div>

            <div className="pt-5 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">What you will practice</h2>
              <ul className="mt-3 space-y-3">
                {course.realWorldOutcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-base text-slate-700">
                    <CheckCircle2
                      className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-5 border-t border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Practical tools covered</h2>
              <p className="mt-1.5 text-sm text-slate-600">
                {course.toolsCovered.join(' · ')}
              </p>
            </div>
          </div>

          {/* Curriculum & Activities Preview */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Inside the Learning Hub
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Every lesson pairs a short walkthrough video with a real-world checklist task.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span>Video Modules ({course.modules.length})</span>
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {course.modules.map((mod) => (
                    <li
                      key={mod.id}
                      className="text-sm text-slate-700 flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100 last:border-b-0 last:pb-0"
                    >
                      <span>{mod.title}</span>
                      <span className="text-xs text-slate-500 tabular-nums shrink-0 mt-0.5">
                        {mod.duration}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span>Hands-On Checklist ({course.activities.length})</span>
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {course.activities.map((act) => (
                    <li
                      key={act.id}
                      className="text-sm text-slate-700 flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100 last:border-b-0 last:pb-0"
                    >
                      <span>{act.title}</span>
                      <span className="text-xs text-slate-500 tabular-nums shrink-0 mt-0.5">
                        {act.estimatedMinutes}m
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Enrollment Card */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <CourseImage src={course.imageUrl} alt={course.title} />

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-3 gap-3 text-center py-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-lg font-bold text-slate-900 tabular-nums">
                    {course.modules.length}
                  </p>
                  <p className="text-xs text-slate-600">Video Lessons</p>
                </div>
                <div className="border-x border-slate-200">
                  <p className="text-lg font-bold text-slate-900 tabular-nums">
                    {course.activities.length}
                  </p>
                  <p className="text-xs text-slate-600">Activities</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 tabular-nums">
                    {course.durationLabel}
                  </p>
                  <p className="text-xs text-slate-600">Total Time</p>
                </div>
              </div>

              {isEnrolled ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-sm text-emerald-900">
                    <CheckCircle2
                      className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>
                      {justEnrolled
                        ? 'You are enrolled in this course! Open the Learning Hub to start watching and checking off activities.'
                        : 'You are enrolled in this course and ready to continue.'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartLearning(course.id)}
                    className="w-full min-h-[54px] px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-base font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    <span>Open in Learning Hub</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => onEnroll(course.id)}
                    className="w-full min-h-[54px] px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-base font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    <span>Enroll in Course</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-xs text-center text-slate-500">
                    Free instant access · No login or payment required
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Related Same-Track Courses & Recommended Next Courses */}
      <section className="mt-14 pt-10 border-t border-slate-200 space-y-10">
        {relatedCourses.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              More courses in {course.track}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Explore other courses of the same type to round out this skill area.
            </p>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCourses.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start"
                >
                  <div className="w-full sm:w-40 shrink-0 rounded-xl overflow-hidden">
                    <CourseImage src={rel.imageUrl} alt={rel.title} />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-xs font-medium text-slate-500">
                      <span className="text-emerald-700 font-semibold">{rel.track}</span> ·{' '}
                      {rel.level} · <span className="tabular-nums">{rel.durationLabel}</span>
                    </p>
                    <h3 className="mt-1.5 text-base font-bold text-slate-900">{rel.title}</h3>
                    <p className="mt-1.5 text-sm text-slate-600">{rel.shortSummary}</p>
                    <button
                      type="button"
                      onClick={() => onSelectCourse(rel.id)}
                      className="mt-4 min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-800 text-sm font-semibold inline-flex items-center justify-center gap-2 self-start transition-colors cursor-pointer"
                    >
                      <span>View Course</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {nextStepCourses.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Recommended to take next
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Graduates who take this course often pair it with these next-step skills.
            </p>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {nextStepCourses.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start"
                >
                  <div className="w-full sm:w-40 shrink-0 rounded-xl overflow-hidden">
                    <CourseImage src={rec.imageUrl} alt={rec.title} />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-xs font-medium text-slate-500">
                      <span className="text-emerald-700 font-semibold">{rec.track}</span> ·{' '}
                      {rec.level} · <span className="tabular-nums">{rec.durationLabel}</span>
                    </p>
                    <h3 className="mt-1.5 text-base font-bold text-slate-900">{rec.title}</h3>
                    <p className="mt-1.5 text-sm text-slate-600">{rec.shortSummary}</p>
                    <button
                      type="button"
                      onClick={() => onSelectCourse(rec.id)}
                      className="mt-4 min-h-[44px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 self-start transition-colors cursor-pointer"
                    >
                      <span>Explore Next Course</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
