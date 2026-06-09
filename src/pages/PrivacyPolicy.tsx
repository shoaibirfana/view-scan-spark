import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <>
    <Helmet>
      <title>Privacy Policy | Team Ecomify</title>
      <link rel="canonical" href="https://www.teamecomify.com/privacy-policy" />
    </Helmet>
    <Navbar />
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-4xl font-heading font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: June 2025</p>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you contact us through our website, we may collect personal information including your name, email address, and WhatsApp number. This information is provided voluntarily when you fill out contact forms or initiate a WhatsApp conversation with us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information you provide solely to respond to your inquiries and deliver the services you request. Your contact details may be used to follow up on conversations, send service-related updates, or provide the deliverables agreed upon during consultation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">3. Cookies & Analytics</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website uses analytics cookies (via Google Analytics) to understand how visitors interact with our content. These cookies collect anonymized data such as pages visited and time on site. We do not use cookies for advertising targeting. You may disable cookies in your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">4. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use WhatsApp (Meta Platforms) for direct communication and Google Analytics for website analytics. When you initiate contact via WhatsApp, your communication is governed by WhatsApp's privacy policy. We do not share your personal data with any third-party advertisers or data brokers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information only as long as necessary to provide our services or as required by applicable law. You may request deletion of your data at any time by contacting us at the address below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, correct, or request deletion of your personal information. To exercise these rights or if you have any privacy-related questions, please contact us at hello@teamecomify.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold mb-3">7. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Team Ecomify · 1411 Upland Dr, Houston, TX 77043 · hello@teamecomify.com · +1 (941) 305-0102
            </p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default PrivacyPolicy;
