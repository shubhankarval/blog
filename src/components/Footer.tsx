import { LuGithub, LuLinkedin } from 'react-icons/lu';

export default function Footer() {
  return (
    <footer className="mt-15 border-t border-bg-elevated">
      <div className="flex flex-col items-center gap-2 p-4 sm:flex-row sm:justify-between">
        <div className="text-sm text-muted">© {new Date().getFullYear()} Shubhankar Valimbe.</div>

        <div className="flex items-center gap-4 text-fg-soft">
          <a
            href="https://github.com/shubhankarval"
            className="transition-colors hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/shubhankar-valimbe/"
            className="transition-colors hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
