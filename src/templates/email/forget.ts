export const forgetPasswordEmailTemplate = (id: string, token: string) => {
  return `
    <h1>Czesć! Zapomniało się hasła ?</h1>
    <p>Nic nie szkodzi!, jeżeli potwierdzasz zmianę hasła, kliknij w poniższy link!</p>
    <p><a href="https://headhunter-g3.networkmanager.pl/user/changepassword/${id}/${token}" target="_blank">https://headhunter-g3.networkmanager.pl/user/changepassword/${id}/${token}</a></p>
 
    <p>Pozdrawiamy,</p>
    <p>Zespoł MEGAK</p>`;
};
