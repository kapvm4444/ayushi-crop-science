import "@/app/globals.css";
import { Providers } from "@/app/providers";

export default function App({ Component, pageProps }) {
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    );
}
