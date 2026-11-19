import { useEffect } from 'react';
import { ArrowRight, Compass, Clock, X } from 'lucide-react';
import { Course } from '../data/courses';

interface AheadModalProps {
  isOpen: boolean;
  course: Course;
  allCourses: Course[];
  onClose: () => void;
  onSelectNextCourse: (courseId: string) => void;
}

export function AheadModal({
  isOpen,
  course,
  allCourses,
  onClose,
  onSelectNextCourse,
}: AheadModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const recommendedCourses = allCourses.filter((c) => course.nextStepIds.includes(c.id));

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-900/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ahead-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-2xl border border-slate-200 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
            <h2 id="ahead-modal-title" className="text-lg sm:text-xl font-bold text-slate-900">
              See What's Ahead
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close roadmap"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Upcoming Modules Inside This Course */}
          <div>
            <p className="text-sm font-semibold text-emerald-700">Coming up in this course</p>
            <h3 className="mt-1 text-base font-bold text-slate-900">{course.title}</h3>

            <div className="mt-4 space-y-3">
              {course.aheadModules.map((mod) => (
                <div
                  key={mod.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">{mod.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{mod.focus}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 tabular-nums shrink-0">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    <span>{mod.duration}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Courses */}
          {recommendedCourses.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm font-semibold text-emerald-700">After you finish</p>
              <h3 className="mt-1 text-base font-bold text-slate-900">
                Recommended courses to take next
              </h3>

              <div className="mt-4 space-y-3">
                {recommendedCourses.map((nextCourse) => (
                  <div
                    key={nextCourse.id}
                    className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        <span className="text-emerald-700 font-semibold">{nextCourse.track}</span> ·{' '}
                        {nextCourse.level} ·{' '}
                        <span className="tabular-nums">{nextCourse.durationLabel}</span>
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">{nextCourse.title}</p>
                      <p className="mt-1 text-xs text-slate-600">{nextCourse.shortSummary}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectNextCourse(nextCourse.id);
                      }}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold inline-flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                    >
                      <span>View Course</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Back to Learning Hub
          </button>
        </div>
      </div>
    </div>
  );
}
