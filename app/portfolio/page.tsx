// app/portfolio/page.tsx
import PortfolioClient from "./PortfolioClient";
import { getPortfolio, projectCards } from "@/lib/portfolio";

// A SERVER component, so the projects can come from BDI: Solenergy edits them in
// the dashboard and this page picks them up on the next 60 s ISR regeneration,
// with no redeploy (lib/portfolio.ts). The grid and its filters are unchanged in
// ./PortfolioClient.tsx. Metadata stays in ./layout.tsx.
export default async function PortfolioPage() {
  const portfolio = await getPortfolio();
  return (
    <PortfolioClient
      projects={projectCards(portfolio.projects)}
      categories={portfolio.categories}
      source={portfolio.source}
    />
  );
}
