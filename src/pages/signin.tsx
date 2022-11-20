import { getCsrfToken } from "next-auth/react";

export default function SignIn({ csrfToken }) {
  return (
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Adres E-Mail
        <input type="email" id="email" name="email" />
      </label>
      <button type="submit">Zaloguj się za pomocą adresu E-Mail</button>
    </form>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
