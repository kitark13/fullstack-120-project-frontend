import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Подорожники",
  description:
    "Подорожники — додаток для збереження та перегляду ваших подорожей",
};

function NotFound() {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
