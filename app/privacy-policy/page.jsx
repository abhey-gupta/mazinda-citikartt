import Head from 'next/head';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Head>
        <title>Privacy Policy - Citikartt</title>
      </Head>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Privacy Policy</h1>
      </div>
      <div className="mt-4 bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-semibold">Data Collection and Usage</h2>
        <p className="text-base mt-2 leading-6">
          At Citikartt, we take your privacy seriously. We collect and store user data for the following purposes:
        </p>
        <ul className="list-disc list-inside pl-4 mt-2 text-base">
          <li>During signup, we collect and store user data for account creation and authentication purposes.</li>
          <li>When you place an order, we store the address and other details you provide during checkout for reference purposes only.</li>
        </ul>
        <p className="text-base mt-2 leading-6">
          We do not use cookies for tracking or storing any personal information.
        </p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Data Security</h2>
        <p className="text-base mt-2 leading-6">
          We take appropriate measures to protect your data and ensure its security. Access to user data is restricted to authorized personnel only, and we do not share your information with third parties.
        </p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Changes to Privacy Policy</h2>
        <p className="text-base mt-2 leading-6">
          We may update this Privacy Policy from time to time to reflect changes in our practices. Please review this policy periodically for any updates.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
