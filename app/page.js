'use client'
import Image from "next/image";
import liff from '@line/liff';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Router from "next/router"
import Profile from "./components/profile";
import axios from "axios";



export default function Home() {
  const [data, setData] = useState({})
  const router = useRouter()
  const [input, setInput] = useState("")
  const [userId, setUserId] = useState("")

  const main = async () => {
    await liff.init({ liffId: '2004882818-3MwvLLB2' })
    if (!liff.isLoggedIn()) {
      liff.login()
      return false
    }
    const profile = await liff.getProfile()
    setData(profile)
    setUserId(profile.userId)


    console.log("login success")
    console.log("data", profile)
  }

  const logout = async () => {
    liff.logout()
    Router.reload()
  }

  const sendMessage = async (e) => {
    e.preventDefault()

    try {
      if (!input) {
        throw new Error('message not found')
      }
      const response = await axios.post('https://node-api-line.vercel.app/send-message',
        {
          userId,
          message: input
        }
      )
      console.log("userId", userId)
      console.log("input", input)
      console.log("response", response.data)

    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    main()
  }, [])



  return (
    <div>
      <span id="loading">Loading</span>
      <div id="lineprofile">
        <img />
        <div>Hello </div>
        <div>UID: your UID</div>
        <Profile profile={data} />
        <div>
          <input onChange={(e) => setInput(e.target.value)} type="text"></input>
          <button className="border" onClick={sendMessage}>send message</button>
        </div>

        <button onClick={logout}>logout</button>

      </div>
    </div>
  );
}
