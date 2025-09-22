import { useAuth } from "./AuthContext";

import Entrance from "./Entrance";
import Tablet from "./Tablet";
import Tunnel from "./Tunnel";

export default function App() {
  const { location, authenticated } = useAuth();

  if (location === "GATE") return <Entrance />;
  if (location === "TABLET" && !authenticated) return <Tablet />;
  if (authenticated) return <Tunnel />;
}
