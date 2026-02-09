"use client";

import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

type Profile = {
  id: string;
  full_name: string | null;
  headline: string | null;
  bio: string | null;
  github_url: string | null;
  linkedin_url: string | null;
};

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    full_name: '',
    headline: '',
    bio: '',
    github_url: '',
    linkedin_url: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) setError(error.message);
      setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const { error } = await supabase.from('profiles').insert([form]);
    if (error) {
      setError(error.message);
    } else {
      window.location.reload();
    }
  }

  async function handleReset() {
    if (!profile) return;
    const { error } = await supabase.from('profiles').delete().eq('id', profile.id);
    if (error) {
      setError(error.message);
    } else {
      window.location.reload();
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!profile) {
    // Setup Form (Onboarding design)
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center bg-background-dark text-white">
        {/* Animated Gradient Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
          <div className="absolute top-[-10%] right-[20%] w-[500px] h-[500px] bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[30%] w-[600px] h-[600px] bg-teal-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative z-10 w-full flex items-center justify-center min-h-screen">
          <form className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col items-center w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg space-y-4" style={{ minWidth: 320, maxWidth: 400 }} onSubmit={handleSubmit}>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4 text-primary">
                <span className="material-symbols-outlined text-[24px]">person_add</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">Build Your Identity</h1>
              <p className="text-gray-400 text-sm md:text-base font-normal">Let's set up your developer profile.</p>
            </div>
            <div className="w-full space-y-4">
              <div className="group relative">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1" htmlFor="fullName">Full Name</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-0 text-gray-500 text-[20px] pointer-events-none group-focus-within:text-primary transition-colors">badge</span>
                  <input className="input-minimal w-full pl-8 py-3 text-white placeholder-gray-600 focus:ring-0 text-lg bg-transparent border-b border-white/20" required id="fullName" placeholder="e.g. Alex Chen" type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
                </div>
              </div>
              <div className="group relative">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1" htmlFor="headline">Professional Headline</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-0 text-gray-500 text-[20px] pointer-events-none group-focus-within:text-primary transition-colors">work</span>
                  <input className="input-minimal w-full pl-8 py-3 text-white placeholder-gray-600 focus:ring-0 text-lg bg-transparent border-b border-white/20" id="headline" placeholder="e.g. Senior React Engineer" type="text" value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} />
                </div>
              </div>
              <div className="group relative">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1" htmlFor="bio">Bio</label>
                <div className="relative">
                  <textarea className="input-minimal w-full py-3 text-white placeholder-gray-600 focus:ring-0 resize-none text-base leading-relaxed bg-transparent border-b border-white/20" id="bio" placeholder="Tell the world about your code philosophy..." rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
                  <div className="absolute bottom-2 right-0 text-xs text-gray-600">{form.bio.length}/160</div>
                </div>
              </div>
              <div className="group relative">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1" htmlFor="github">GitHub URL</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-0 text-gray-500 text-[20px] pointer-events-none group-focus-within:text-primary transition-colors">code</span>
                  <input className="input-minimal w-full pl-8 py-3 text-white placeholder-gray-600 focus:ring-0 text-lg bg-transparent border-b border-white/20" id="github" placeholder="https://github.com/yourhandle" type="text" value={form.github_url} onChange={e => setForm({ ...form, github_url: e.target.value })} />
                </div>
              </div>
              <div className="group relative">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1" htmlFor="linkedin">LinkedIn URL</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-0 text-gray-500 text-[20px] pointer-events-none group-focus-within:text-primary transition-colors">work</span>
                  <input className="input-minimal w-full pl-8 py-3 text-white placeholder-gray-600 focus:ring-0 text-lg bg-transparent border-b border-white/20" id="linkedin" placeholder="https://linkedin.com/in/yourhandle" type="text" value={form.linkedin_url} onChange={e => setForm({ ...form, linkedin_url: e.target.value })} />
                </div>
              </div>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button className="btn-glow w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold h-10 text-base tracking-wide flex items-center justify-center gap-2 mt-6 mb-2 transform transition-transform active:scale-[0.98]" type="submit">
              <span>Create Profile</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Profile Card (Gold Master design)
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Ambient Background Effects */}
      <div className="mesh-gradient-1 absolute w-[600px] h-[600px] rounded-full bg-primary/15 top-[-100px] left-[-100px] filter blur-[60px] pointer-events-none z-0"></div>
      <div className="mesh-gradient-2 absolute w-[500px] h-[500px] rounded-full bg-purple-600/10 bottom-[-50px] right-[-50px] filter blur-[60px] pointer-events-none z-0"></div>
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-md glass-card rounded-2xl p-6 sm:p-8 flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>Profile</span>
          </div>
          <div className="flex flex-col items-center text-center w-full mb-8">
            {/* Avatar with glowing ring */}
            <div className="glow-ring mb-6">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-black/50">
                <img alt="Professional headshot" className="w-full h-full object-cover" src="https://i.pinimg.com/736x/ec/74/7a/ec747a688a5d6232663caaf114bad1c3.jpg" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{profile.full_name}</h1>
            <p className="text-lg font-medium text-gradient-primary mb-4">{profile.headline}</p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[300px]">{profile.bio}</p>
          </div>
          <div className="w-full flex flex-col gap-3">
            <a className="group btn-hover-effect flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/5 text-white decoration-none" href={profile.github_url ?? ''} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/40 text-white group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">code</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-sm">GitHub</span>
                  <span className="text-xs text-gray-500">{profile.github_url?.replace('https://github.com/', '@') ?? ''}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300">chevron_right</span>
            </a>
            <a className="group btn-hover-effect flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/5 text-white decoration-none" href={profile.linkedin_url ?? ''} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/40 text-white group-hover:text-[#0077b5] transition-colors">
                  <span className="material-symbols-outlined">work</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-sm">LinkedIn</span>
                  <span className="text-xs text-gray-500">Connect with me</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300">chevron_right</span>
            </a>
          </div>
          <button className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>Reset Profile</button>
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
      </main>
    </div>
  );
}
