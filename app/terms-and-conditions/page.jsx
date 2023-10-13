import Head from 'next/head';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Head>
        <title>Terms and Conditions - Citikartt</title>
      </Head>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Terms and Conditions</h1>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Acceptance of Terms and Conditions</h2>
        <p>
          By accepting our ‘Terms and Conditions’, and proceeding from the sign-up page, the signee (hereby defined as the person who accepts our ‘Terms and Conditions’ or tries to proceed from the sign-up page) agrees to the below terms and conditions with no exceptions:
        </p>
        <ul className="list-disc list-inside pl-4">
          <li>Company i.e. Citikartt is not liable for any of the services provided.</li>
          <li>All the disputes are subjected to mandi jurisdiction only between the signee and the Vendor (hereby defined as the shop owner selling his/her products).</li>
          <li>Citikartt is a marketplace for shopping. It does not sell any products of its own. In order to provide a comprehensive choice of products across various categories, Citikartt has invited various vendors who have listed their products for sale. The product type or anything related to the product is the sole responsibility of the vendor and no interference of the citikartt company.</li>
          <li>Citikartt assures that the items which are not for sale in INDIA will not be listed by any vendor.</li>
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Cancellation Policies</h2>
        <ul className="list-disc list-inside pl-4">
          <li>Order once placed cannot be cancelled.</li>
          <li>Orders not been able to get delivered due to natural calamities are not liable for any refund.</li>
          <li>Citikartt do not offer any guaranteed time delivery.</li>
          <li>The refund request can only be raised if and only if all of the below mentioned criterias are met:</li>
          <li>The delivery personal does not contact through any means for the update of the order.</li>
          <li>The vendor has cancelled the order.</li>
          <li>The order has not been dispatched (no restriction of time frame).</li>
          <li>No natural calamities causing hindrance in delivery of the order placed.</li>
        </ul>
        <p>Process for requesting a refund:</p>
        <p>Visit the contact us section and fill in your query. Be assured to get resolution within 48 hours or else full refund will be issued by the company.</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Shipping and Delivery conditions</h2>
        <ul className="list-disc list-inside pl-4">
          <li>The shipping costs vary depending on the location of the signee.</li>
          <li>Exact shipping charges or any other associated costs are well informed on the checkout page.</li>
          <li>The estimated delivery time may vary from product to product between 30 minutes to 24 hours.</li>
          <li>The order tracking involves the following steps, pending, processing, on the way followed by delivered.</li>
        </ul>
      </div>
      <div className="mt-8">
        <p>The above conditions may change from time to time by the company to ensure serving in a better and proper way.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
