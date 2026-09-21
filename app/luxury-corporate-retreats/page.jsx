import CommercialServicePage from "../components/CommercialServicePage";
import { commercialServices } from "../commercialServices";
import { buildMetadata } from "../seo";

const service = commercialServices["luxury-corporate-retreats"];
export const metadata = buildMetadata({ title: service.metaTitle, description: service.description, path: `/${service.slug}`, keywords: service.keywords });
export default function Page() { return <CommercialServicePage service={service} related={[commercialServices["luxury-travel-planning"], commercialServices["luxury-family-travel"], commercialServices["luxury-wellness-retreats"]]} />; }
