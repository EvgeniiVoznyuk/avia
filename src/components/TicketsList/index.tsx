import React, { useState } from "react"
import TicketCard from "../TicketCard"
import s from "./TicketsList.module.sass"
import { useSelector } from "react-redux"
import { selectTickets } from "store/slices/ticketsSlice"

const VISIBLE_TICKETS_COUNT = 5

const TicketList: React.FC = () => {
  const { tickets, filters, sort } = useSelector(selectTickets)
  const [visibleCount, setVisibleCount] = useState(VISIBLE_TICKETS_COUNT)

  const filteredTickets = tickets.filter((ticket) => {
    if (filters.length === 0 || filters.includes("all")) return true
    const stopsCount = ticket.details[0]?.transfers.length || 0
    if (filters.includes("no-stops") && stopsCount === 0) return true
    if (filters.includes("one-stop") && stopsCount === 1) return true
    if (filters.includes("two-stops") && stopsCount === 2) return true
    if (filters.includes("three-stops") && stopsCount === 3) return true

    return false
  })

  const sortedTickets = filteredTickets.sort((a, b) => {
    const aPrice = Number(a.price.replace(" ", ""))
    const bPrice = Number(b.price.replace(" ", ""))
    const aTransfersLength = a.details[0].transfers.length
    const bTransfersLength = b.details[0].transfers.length
    switch (sort) {
      case "cheapest":
        return aPrice - bPrice
      case "fastest":
        return a.travelTime - b.travelTime
      case "optimal":
        return (
          a.travelTime - b.travelTime ||
          aTransfersLength - bTransfersLength ||
          aPrice - bPrice
        )
      default:
        return 0
    }
  })

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + VISIBLE_TICKETS_COUNT)
  }

  const handleShowLess = () => {
    setVisibleCount(VISIBLE_TICKETS_COUNT)
  }

  const showLess =
    visibleCount >= sortedTickets.length &&
    sortedTickets.length > VISIBLE_TICKETS_COUNT

  return (
    <div className={s.ticketList}>
      <div>
        {sortedTickets.slice(0, visibleCount).map((ticket) => (
          <TicketCard key={ticket.id} {...ticket} />
        ))}
      </div>

      {visibleCount < sortedTickets.length && (
        <button className={s.ticketList__loadMore} onClick={handleLoadMore}>
          показати ще 5 квитків
        </button>
      )}

      {showLess && (
        <button className={s.ticketList__showLess} onClick={handleShowLess}>
          згорнути
        </button>
      )}
    </div>
  )
}

export default TicketList
