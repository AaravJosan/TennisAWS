import "./App.css";
import FileUpload from "./components/fileUpload";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.35em] text-violet-400">
            Video upload
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-white">
            Bring your highlights to life
          </h1>
          <p className="mt-4 text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Drop in your MP4 footage and our AI-powered tennis insights will do
            the rest. Upload a clip to get started.
          </p>
        </header>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">
          <FileUpload />
        </div>


      </div>
    </div>
  );
}

export default App;
