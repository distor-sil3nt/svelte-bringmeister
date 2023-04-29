export const formatCurrency = (amount: number, locale: string, currency: string) =>
	amount.toLocaleString(locale, { style: 'currency', currency });
