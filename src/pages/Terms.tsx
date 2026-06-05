import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>Terms of Service | Team Ecomify</title>
      <meta name="description" content="Read the Team Ecomify terms of service governing the use of our website and services." />
      <link rel="canonical" href="https://teamecomify.com/terms" />
    </Helmet>
    <Navbar />
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl prose prose-slate dark:prose-invert">
        <h1 className="text-4xl font-heading font-bold mb-4">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 2026</p>

        <p>By using teamecomify.com or engaging Team Ecomify for any service, you agree to these Terms of Service.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">1. Services Provided</h2>
        <p>Team Ecomify provides e-commerce growth services, including Amazon PPC management, listing optimization, account management, store setup, and consulting. Specific deliverables for each engagement are defined in writing prior to commencement.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">2. Payment Terms</h2>
        <p>Payments are due in advance unless otherwise agreed. Recurring monthly retainers are billed at the start of each service period.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">3. Refund Policy</h2>
        <p>Refunds are evaluated case by case. If work has not yet started, a full refund will be issued. Once work has begun, refunds are issued for any unused portion of the engagement at Team Ecomify's discretion.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">4. Client Responsibilities</h2>
        <p>You agree to provide accurate information and timely access to accounts required to deliver the agreed services.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">5. Limitation of Liability</h2>
        <p>Team Ecomify is not responsible for outcomes outside our control, including platform policy changes, account suspensions due to client actions, or market conditions. Our aggregate liability is limited to the fees paid by the client in the preceding three (3) months.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">6. Confidentiality</h2>
        <p>We treat all client business information as confidential and do not share it with third parties without consent.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">7. Governing Law</h2>
        <p>These Terms are governed by the laws of the State of Texas, USA.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">8. Contact</h2>
        <p>Questions about these terms? Email <a href="mailto:hello@teamecomify.com" className="text-primary">hello@teamecomify.com</a>.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
