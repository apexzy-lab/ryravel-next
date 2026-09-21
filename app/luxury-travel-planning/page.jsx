import CommercialServicePage from "../components/CommercialServicePage";
import { commercialServices } from "../commercialServices";
import { buildMetadata } from "../seo";

const service = commercialServices["luxury-travel-planning"];
export const metadata = buildMetadata({ title: service.metaTitle, description: service.description, path: `/${service.slug}`, keywords: service.keywords });
export default function Page() { return <CommercialServicePage service={service} related={[commercialServices["luxury-family-travel"], commercialServices["luxury-honeymoons"], commercialServices["luxury-wellness-retreats"]]} />; }
