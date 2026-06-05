import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>Privacy Policy | Team Ecomify</title>
      <meta name="description" content="Read the Team Ecomify privacy policy to learn how we collect, use, and protect your data." />
      <link rel="canonical" href="https://teamecomify.com/privacy-policy" />
    </Helmet>
    <Navbar />
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl prose prose-slate dark:prose-invert">
        <h1 className="text-4xl font-heading font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 2026</p>

        <p>At Team Ecomify, your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard the information you share with us through teamecomify.com.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">1. Information We Collect</h2>
        <p>When you contact us through our website, WhatsApp, or email, we may collect:</p>
        <ul>
          <li>Your name</li>
          <li>Email address</li>
          <li>WhatsApp / phone number</li>
          <li>Any message or business details you choose to share</li>
        </ul>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">2. How We Use Your Information</h2>
        <p>We use the information you provide to:</p>
        <ul>
          <li>Respond to your inquiries and consultation requests</li>
          <li>Deliver the services you have engaged us for</li>
          <li>Send you relevant updates about your project</li>
        </ul>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">3. Cookies and Analytics</h2>
        <p>We use first-party cookies and privacy-friendly analytics (such as Google Analytics and Vercel Analytics) to understand how visitors use our site. No personally identifiable information is sold to third parties.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">4. Third-Party Services</h2>
        <p>Our site links to third-party services including WhatsApp Business and Google Maps. These services have their own privacy practices that we do not control.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">5. Data Security</h2>
        <p>We take reasonable measures to protect the information you share with us, but no method of transmission over the internet is 100% secure.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">6. Your Rights</h2>
        <p>You may request access, correction, or deletion of your personal data at any time.</p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-3">7. Contact</h2>
        <p>For any privacy questions, email us at <a href="mailto:hello@teamecomify.com" className="text-primary">hello@teamecomify.com</a>.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
