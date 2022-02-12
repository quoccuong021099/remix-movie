import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./styles.css";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
      integrity:
        "sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3",
      crossOrigin: "anonymous",
    },
  ];
};

export const meta: MetaFunction = () => {
  return { title: "Trang chủ", description: "A description" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="body">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <Footer />
      </body>
    </html>
  );
}
export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="body">
        <div className="">Xin thông báo</div>
        <div className="">
          <div className="">Không tìm thấy trang này!</div>
          <p>
            {caught.status} {caught.statusText}
          </p>
        </div>
      </div>
    );
  }

  throw new Error("Unkown error");
}
export function ErrorBoundary({ error }: any) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="body">
        {/* add the UI you want your users to see */}
        {error.message}
        <Scripts />
      </body>
    </html>
  );
}
