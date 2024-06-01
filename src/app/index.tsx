import { useDispatch } from "react-redux"
import { AppDispatch } from "store/store"
import React, { useEffect } from "react"
import { fetchTickets } from "store/slices/ticketsSlice"
import s from "./App.module.sass"
import Header from "components/Header"
import Filter from "components/Filter"
import Tabs from "components/Tabs"
import TicketsList from "components/TicketsList"

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  return (
    <div className={s.app}>
      <Header />
      <div className={s.app__content}>
        <Filter />

        <div className={s.app__list}>
          <Tabs />
          <TicketsList />
        </div>
      </div>
    </div>
  )
}

export default App
