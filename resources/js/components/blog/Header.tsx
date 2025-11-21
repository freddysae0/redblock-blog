import { Link, usePage } from "@inertiajs/react";
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
export function Header({ canRegister = true }: { canRegister?: boolean }) {

  const styles = {
    links: "text-sm text-foreground hover:text-accent transition-colors",
  };
  const { auth } = usePage<SharedData>().props;
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">M</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">ModernBlog</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className={styles.links}>Home</a>
          <a href="#" className={styles.links}>Stories</a>
          <a href="#" className={styles.links}>Topics</a>
          <a href="#" className={styles.links}>About</a>
          {auth?.user ? (
            <Link
              href={dashboard()}
              className={styles.links}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href={login()}
                className={styles.links}
              >
                Log in
              </Link>
              {canRegister && (
                <Link
                  href={register()}
                  className={styles.links}
                >
                  Register
                </Link>
              )}
            </>
          )}
        </nav>
        <button className="text-sm font-medium text-accent hover:text-accent/80 transition-colors md:hidden">
          Menu
        </button>
      </div>
    </header>
  );
}
