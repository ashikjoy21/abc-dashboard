// Customizable message templates for different scenarios
export const messageTemplates = {
  expiringToday: (name: string, plan: string, expiry: string) =>
    `Dear ${name}, your ${plan} plan is expiring TODAY (${expiry}). Please recharge immediately to avoid service interruption. Contact us at 0484-1234567 for assistance. - ABC ISP`,

  expiringTomorrow: (name: string, plan: string, expiry: string) =>
    `Dear ${name}, your ${plan} plan is expiring tomorrow (${expiry}). Please recharge to continue uninterrupted service. Contact us at 0484-1234567 for assistance. - ABC ISP`,

  paymentReminder: (name: string, plan: string, amount: string) =>
    `Dear ${name}, your ${plan} payment of ₹${amount} is pending. Please pay to continue your service. Contact us at 0484-1234567. - ABC ISP`,

  serviceRestored: (name: string) =>
    `Dear ${name}, your internet service has been restored. Thank you for your patience. For any issues, contact us at 0484-1234567. - ABC ISP`,

  incidentUpdate: (area: string, issue: string, eta: string) =>
    `Service Update: ${issue} in ${area} area. Our team is working to resolve this. Expected resolution: ${eta}. We apologize for the inconvenience. - ABC ISP`,
}

// Contact information that can be easily updated
export const contactInfo = {
  phone: "0484-1234567",
  whatsapp: "9876543210",
  email: "support@abcisp.com",
  website: "www.abcisp.com",
}
