export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-brand-gray-500 text-sm mb-8">Last updated: April 2026</p>

        <div className="prose prose-invert max-w-none space-y-6 text-brand-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
            <p>
              <strong>Account information:</strong> Email address and encrypted password hash when you create an account.
            </p>
            <p>
              <strong>Uploaded documents:</strong> Documents you upload for scanning. These are processed by our AI
              and permanently deleted from our servers after analysis is complete.
            </p>
            <p>
              <strong>Scan results:</strong> The analysis results generated from your documents. These are stored
              in your account so you can access them later.
            </p>
            <p>
              <strong>Payment information:</strong> Payment processing is handled entirely by Stripe.
              We do not store your credit card details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">2. Document Handling & HIPAA Considerations</h2>
            <p>
              We recognize that medical bills and other documents may contain protected health information (PHI).
              Our document handling procedures are designed with this in mind:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Documents are encrypted during upload using TLS 1.3</li>
              <li>Documents are processed in isolated, encrypted environments</li>
              <li>All uploaded documents are permanently deleted after analysis is complete</li>
              <li>Document data is never used for AI model training</li>
              <li>Document data is never shared with third parties except our AI processing provider (Anthropic) as necessary to perform the analysis</li>
              <li>Access to document processing systems is strictly limited to essential personnel</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>To provide document analysis services</li>
              <li>To maintain your account and scan history</li>
              <li>To process payments</li>
              <li>To send transactional emails (receipts, scan completion notifications)</li>
              <li>We do NOT sell your data</li>
              <li>We do NOT use your documents for marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">4. Data Retention</h2>
            <p>
              <strong>Documents:</strong> Permanently deleted after analysis (typically within minutes).
            </p>
            <p>
              <strong>Scan results:</strong> Retained in your account until you delete them or close your account.
            </p>
            <p>
              <strong>Account data:</strong> Retained until you request account deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">5. Data Deletion</h2>
            <p>
              You may request complete deletion of your account and all associated data at any time
              by contacting support@jargonscan.com. We will process your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">6. Security</h2>
            <p>
              We implement industry-standard security measures including encryption in transit (TLS),
              encryption at rest, secure authentication, rate limiting, and regular security audits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">7. Third-Party Services</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Anthropic (Claude AI):</strong> Powers our document analysis. Documents are sent to their API for processing.</li>
              <li><strong>Stripe:</strong> Handles payment processing. See Stripe's privacy policy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">8. Contact</h2>
            <p>
              For privacy-related questions or data deletion requests, contact us at support@jargonscan.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
