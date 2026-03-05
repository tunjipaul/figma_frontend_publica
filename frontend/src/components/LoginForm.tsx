import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';


export const LoginForm = () => {
   const navigate = useNavigate();
   const login = useAuthStore((state) => state.login);
   const [showPassword, setShowPassword] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [rememberMe, setRememberMe] = useState<boolean | 'indeterminate'>(false);

   const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      // Mock login: use the email as the name and a default avatar
      login({
         name: email.split('@')[0],
         avatar: null,
         role: 'Admin'
      });

      navigate('/patients');
   };

   return (
      <form onSubmit={handleSubmit} className="w-full max-w-[340px] space-y-4">
         <h2 className="pb-2 text-center text-[14px] font-normal text-[#1E2A4A] opacity-60 sm:text-left">Sign in to continue</h2>

         <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full h-[52px] rounded-none border border-[#A8ADB5] px-5 text-[15px] text-[#2D3138] placeholder:text-[#9AA0A9] focus-visible:ring-0 outline-none"
         />

         <div className="relative">
            <input
               type={showPassword ? 'text' : 'password'}
               placeholder="Password"
               value={password}
               onChange={(event) => setPassword(event.target.value)}
               required
               className="w-full h-[52px] rounded-none border border-[#A8ADB5] px-5 pr-24 text-[15px] text-[#2D3138] placeholder:text-[#9AA0A9] focus-visible:ring-0 outline-none"
            />
            <button
               type="button"
               onClick={() => setShowPassword((prev) => !prev)}
               className="absolute right-5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#30343A]"
            >
               {showPassword ? 'HIDE' : 'SHOW'}
            </button>
      </div>

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
         <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-[#30343A]" htmlFor="remember">
            <input
               type="checkbox"
               id="remember"
               checked={rememberMe === true}
               onChange={(e) => setRememberMe(e.target.checked)}
               className="size-4 rounded-[2px] border-[#6E737D] accent-[#30343A]"
            />
            Remember Me
         </label>

         <a href="#" className="text-[13px] font-bold text-[#1B5DF1] sm:ml-auto">
            Forgot Password?
         </a>
      </div>

      <button
         type="submit"
         className="mt-6 h-[52px] w-full rounded-sm bg-[#1B5DF1] text-[15px] font-bold text-white hover:bg-[#154FC1] transition-colors"
      >
         Login
      </button>
   </form>
   );
};