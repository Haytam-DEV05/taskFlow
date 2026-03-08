import { createContext, useEffect, useState } from "react";
import supabase from "../util/supabase";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // CHECK THE USER =>
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        console.log(session?.user);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // SIGNUP WITH SUPABASE =>
  const SignUp = async (email, password, metaData) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) return { error, data };
    if (data?.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        fullName: metaData.fullName,
        avatar_url: "",
      });
      return { data, error };
    }
  };

  //   SIGNIN WITH SUPABASE =>
  const SignIn = async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error, data };
  };

  // SIGNOUT WITH SUPABASE =>
  const SignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ SignUp, SignIn, SignOut, user }}>
      {children}
    </UserContext.Provider>
  );
};
