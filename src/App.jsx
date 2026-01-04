import { useState } from "react";
import IntroScreen from "./components/IntroScreen";
import SubscriptionPlans from "./components/SubscriptionPlans";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return showIntro ? (
    <IntroScreen onFinish={() => setShowIntro(false)} />
  ) : (
    <SubscriptionPlans />
  );
}

export default App;
