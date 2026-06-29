import { usePuterStore } from "~/data/putter";
import bgAuth from "../assets/images/bg-auth.svg";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export const meta = () => [
  {
    title: "Resumind | Auth",
  },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  // Auth Constant
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const nav = useNavigate();

  //Style Constant
  const btnsStyle =
    "bg-blue-600 font-bold rounded-3xl py-2 px-4 text-white animate-pulse cursor-pointer";

  // UseEffect For Check If Is Auth
  useEffect(() => {
    if (auth.isAuthenticated) nav(next);
  }, [auth.isAuthenticated, next]);

  return (
    <div
      className="min-h-screen bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${bgAuth})` }}>
      <section className="gradient-border shadow-lg">
        <div className="flex flex-col gap-8 bg-white p-10 rounded-4xl">
          <section className="flex flex-col items-center text-center gap-5">
            <h1 className="font-bold text-3xl">Welcome</h1>
            <h2 className="text-1xl">Log In To Continue Your Job Journey</h2>
          </section>

          <section>
            {isLoading ? (
              <button className={btnsStyle} style={{ width: "100%" }}>
                Signing You In
              </button>
            ) : auth.isAuthenticated ? (
              <button
                onClick={auth.signOut}
                className={btnsStyle}
                style={{ width: "100%" }}>
                Log Out
              </button>
            ) : (
              <button
                onClick={auth.signIn}
                className={btnsStyle}
                style={{ width: "100%" }}>
                Log In
              </button>
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export default Auth;
