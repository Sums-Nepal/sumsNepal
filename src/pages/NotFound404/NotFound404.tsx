import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";

function NotFoundPage() {
  const navigate = useNavigate();

  const redirectToTheHomePage = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative"
        >
          <h1 className="text-[12rem] sm:text-[16rem] font-black text-slate-200 dark:text-slate-800 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent uppercase tracking-tighter drop-shadow-sm">
              Lost in Space?
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <p className="text-lg sm:text-xl text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
            The page you are looking for seems to have drifted away or doesn't exist anymore.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={redirectToTheHomePage}
            className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10 dark:shadow-white/5"
          >
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Button>
          <Button
            variant="outline"
            className="h-14 px-8 rounded-2xl border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 text-center">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
          Error Code: 404_PAGE_NOT_FOUND
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
