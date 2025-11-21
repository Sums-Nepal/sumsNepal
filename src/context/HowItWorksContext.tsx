import React, { createContext, useCallback, useContext, useState } from "react";

const HowItWorksContext = createContext<any>(null);

export function HowItWorksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStateNum, setCurrentStateNum] = useState<number>(1);

  const one = useCallback(() => {
    setCurrentStateNum(1);
  }, []);

  const two = useCallback(() => {
    setCurrentStateNum(2);
  }, []);

  const three = useCallback(() => {
    setCurrentStateNum(3);
  }, []);

  const four = useCallback(() => {
    setCurrentStateNum(4);
  }, []);

  return (
    <HowItWorksContext.Provider
      value={{ currentStateNum, one, two, three, four }}
    >
      {children}
    </HowItWorksContext.Provider>
  );
}



export function useHowItWorks() {
  return useContext(HowItWorksContext)
}