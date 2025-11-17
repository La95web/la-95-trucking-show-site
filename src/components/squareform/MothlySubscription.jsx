import { useState } from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

export default function MonthlySubscriptionForm() {
  const [loading, setLoading] = useState(false);

  const handleMonthlyToken = async (token, buyer) => {
    setLoading(true);

    const res = await fetch('/api/v1/subscriptions/monthly', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_id: token.token,
        plan: 'monthly',
        buyer,
      }),
    });

    const result = await res.json();
    setLoading(false);

    if (result.success) {
      // Mostrar mensaje o redirigir
    } else {
      // Mostrar error
    }
  };

  return (
    <PaymentForm
      applicationId="sq0idp-Y0QZQ-Xx-Xx-Xx-Xx"
      locationId="LID"
      cardTokenizeResponseReceived={handleMonthlyToken}
      createVerificationDetails={() => ({
        amount: '4.99',
        currencyCode: 'USD',
        intent: 'CHARGE',
        billingContact: {
          givenName: 'Luis',
          familyName: 'Santeliz',
          countryCode: 'US',
          city: 'Miami',
          addressLines: ['123 Main Street'],
        },
      })}
    >
      <CreditCard />
    </PaymentForm>
  );
}
