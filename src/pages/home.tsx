
import PastResults from "../components/PastResults"; 

export default function Home() {
  return (
    <div className="space-y-8">
      <section>
        <h2>Welcome to the Home Page</h2>
        <p>This is the main landing page of the application.</p>
      </section>

      {/* Past attempts graph */}
      <section>
        <PastResults />
      </section>
    </div>
  );
}
