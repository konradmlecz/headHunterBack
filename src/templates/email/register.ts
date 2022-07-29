export const registerEmailTemplate = (id: string, token: string) => {
  return `
    <h1>Witaj Kursancie na platfromie Head Huneter MEGAK!</h1>
    <p>Twoje konto zostało założone! Kliknij w poniższy link, aby potwierdzić rejesrację i ustawić hasło!</p>
    <p><a href="https://www.youtube.com/watch?v=6iFbuIpe68k" target="_blank">http://localhost:3001/auth/register/${id}/${token}</a></p>
    <p>Nie zapomnij uzupełnić profilu!</p>`;
};
