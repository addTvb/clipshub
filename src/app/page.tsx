import BusinessLanding from "src/widgets/business/landing/Landing";

export const dynamic = "force-static";

/** Root URL serves the business landing (same as /business). */
export default function HomePage() {
  return <BusinessLanding />;
}
