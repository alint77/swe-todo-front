
import Router, { useRouter } from "next/router"
import { useEffect } from "react"
export default function Home() {

  const router = useRouter()

  router.push('/login')

  return (
    <></>
    )
}
