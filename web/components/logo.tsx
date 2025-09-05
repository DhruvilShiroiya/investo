import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"], weight: "700" })

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <div className={`text-3xl ${inter.className}`}>
          investo
        </div>
      </Link>
    </div>
  )
}

export default Logo
