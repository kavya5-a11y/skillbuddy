import { SKILL_TRACKS, SkillTrack } from '../data/courses';

interface FooterProps {
  onNavigateHome: () => void;
  onSelectTrack: (track: SkillTrack) => void;
  onNavigateHub: () => void;
}

export function Footer({ onNavigateHome, onSelectTrack, onNavigateHub }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">Skill Buddy</p>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xs">
              Practical, hands-on courses built to help college graduates step into real-world jobs with confidence.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Practical Skill Tracks</h3>
            <ul className="mt-3 space-y-2">
              {SKILL_TRACKS.map((track) => (
                <li key={track}>
                  <button
                    type="button"
                    onClick={() => onSelectTrack(track)}
                    className="text-sm text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer text-left"
                  >
                    {track}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  Browse All Courses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateHub}
                  className="text-sm text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  Open Learning Hub
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>Skill Buddy · Built for college graduates learning practical workplace skills.</p>
          <p>Sample catalog · Free open preview</p>
        </div>
      </div>
    </footer>
  );
}
