export const registerEmailTemplate = (id: string, token: string) => {
  return `
    <h1>Witaj na platfromie Head Hunter MEGAK!</h1>
    <p>Twoje konto zostało założone! Kliknij w poniższy link, aby potwierdzić rejestracje i ustawić hasło!</p>
    <p><a href="https://headhunter-g3.networkmanager.pl/user/register/${id}/${token}" target="_blank">https://headhunter-g3.networkmanager.pl/user/register/${id}/${token}</a></p>
    
    <p>Pozdrawiamy,</p>
    <p>Zespoł MEGAK</p>`;
};
