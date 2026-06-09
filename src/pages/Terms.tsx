import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => (
  <>
    <Helmet>
      <title>Terms of Service | Team Ecomify</title>
      <link rel="canonical" href="https://www.teamecomify.com/terms" />
    </Helmet>
    <Navbar />
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-4xl font-heading font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">Last updated: June 2025</p>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">1. Services Provided</h2>
            <p className="text-muted-foreground leading-relaxed">
              Team Ecomify provides eCommerce consulting and management services including but not limited to Amazon PPC management, listing optimization, Shopify store development, Walmart Marketplace setup, account recovery, and business formation assistance. The specific scope of services is agreed upon between the client and Team Ecomify prior to commencement of work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">2. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Payment terms are established on a per-project or monthly retainer basis as agreed in writing. Consultancy sessions are charged at $50 per session (45–60 minutes), payable in advance. All prices are in USD. Team Ecomify reserves the right to pause or discontinue services if payment obligations are not met.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">3. Refund Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Refunds are considered on a case-by-case basis. We are committed to client satisfaction and will work to resolve any concerns before processing a refund. Requests must be submitted in writing to hello@teamecomify.com within 7 days of service delivery. Consultancy sessions are non-refundable once conducted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">4. Client Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              Clients are responsible for providing accurate information, timely access to accounts and assets required for service delivery, and responding to communications within a reasonable timeframe. Delays caused by the client may affect project timelines and deliverables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Team Ecomify is not liable for outcomes dependent on third-party platform policies (including Amazon, Shopify, Walmart, or Meta), market conditions, or factors outside our reasonable control. Our liability in any circumstance is limited to the amount paid for the specific service in question.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All work product created by Team Ecomify for a client becomes the client's property upon full payment. Team Ecomify retains the right to reference work completed (without disclosing confidential details) for portfolio and marketing purposes unless the client requests otherwise in writing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">7. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service are governed by the laws of the State of Texas, USA. Any disputes shall be resolved in the courts of Harris County, Texas, or through mutually agreed arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">8. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these terms: Team Ecomify · 1411 Upland Dr, Houston, TX 77043 · hello@teamecomify.com
            </p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Terms;
