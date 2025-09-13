interface ConvertCurrencyParams {
  readonly id: string;
  amount: number;
  currency: "USD" | "EUR" | "UAH";
}

function convertCurrency(param: ConvertCurrencyParams): void {
  // param.id = "test2";
  param.amount = 20;

  console.log(`Converting ${param.amount} to ${param.currency}`);
}

convertCurrency({ amount: 5, currency: "EUR", id: "test" });
