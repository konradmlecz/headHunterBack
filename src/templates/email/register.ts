export const registerEmailTemplate = (id: string, token: string) => {
  return `
    <h1>Witaj na platfromie Head Hunter MEGAK!</h1>
    <p>Twoje konto zostało założone! Kliknij w poniższy link, aby potwierdzić rejestracje i ustawić hasło!</p>
    <p><a href="http://localhost:3000/user/register/${id}/${token}" target="_blank">http://localhost:3001/user/register/${id}/${token}</a></p>
    
    <p>Pozdrawiamy,</p>;
    <p>Zespoł MEGAK</p>`;
};
