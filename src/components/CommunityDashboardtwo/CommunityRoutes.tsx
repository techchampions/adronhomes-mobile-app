import { Route } from "react-router-dom";
import AccessCodeSection from "./AccessCodeSection";
import CommunityChat from "./CommunityChat";
import CommunityDashboard from "./CommunityDashboard";
import ConversationSection from "./ConversationSection";
import DashboardOverview from "./DashboardOverview";
import DocumentsSection from "./DocumentsSection";
import MaintenanceSection from "./MaintenanceSection";
import PaymentSection from "./PaymentSection";
import UtilityPayment from "./UtilityPayment";

const communityRoutes = (
  <Route path="estate/*" element={<CommunityDashboard />}>
    <Route index element={<DashboardOverview />} />
    <Route path="chat" element={<CommunityChat />} />
    <Route path="messages" element={<ConversationSection />} />
    <Route path="payments" element={<PaymentSection />} />
    <Route path="utilities" element={<UtilityPayment />} />
    <Route path="access" element={<AccessCodeSection />} />
    <Route path="maintenance" element={<MaintenanceSection />} />
    <Route path="documents" element={<DocumentsSection />} />
  </Route>
);

export default communityRoutes;
